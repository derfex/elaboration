import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, combineLatest, map, type Observable, switchMap, tap, zip } from 'rxjs'
import { assertDefined } from '~app/dev/dev-error.util'
import { prepareProfileDataBEAPIURL } from '~be/backend-api-configuration/backend-api-configuration'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import { DXActivitiesCompiledForBEService } from '~be/dx-activities/dx-activities-compiled-for-be.service'
import type {
  DXActivitiesCompiledSectionParametersForBE,
  DXActivityCompiledForBE,
} from '~be/dx-activities/dx-activities-compiled-for-be.type'
import { DXActivitiesForBEService } from '~be/dx-activities/dx-activities-for-be.service'
import type { DXActivitiesSectionParametersForBE, DXActivityForBE } from '~be/dx-activities/dx-activities-for-be.type'
import { DXActivitySkillsForBEService } from '~be/dx-activities/dx-activity-skills-for-be.service'
import type { DXActivitySkillForBE } from '~be/dx-activities/dx-activity-skills-for-be.type'
import type { DXActivity, DXActivityCodename } from '~entities/dx-activities/dx-activities.type'
import { LoadingNotifierService } from '~integrator/data-access/loading-notifier/loading-notifier.service'
import { LocaleSwitcherService } from '~integrator/data-access/locale/locale-switcher.service'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'
import { LocaleUtil } from '~integrator/data-access/locale/locale.util'
import type {
  DXActivitiesSectionParameters,
  DXActivitiesSectionParametersAndList,
} from '~ui/dx-activities/dx-activities-section/dx-activities-section.type'
import type { DXActivitiesListItem } from '~ui/dx-activities/dx-activities/dx-activities.type'

@Injectable({
  providedIn: 'root',
})
export class DXActivitiesSectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #dxActivitiesCompiledForBEService = inject(DXActivitiesCompiledForBEService)
  readonly #dxActivitiesForBEService = inject(DXActivitiesForBEService)
  readonly #dxActivitySkillsForBEService = inject(DXActivitySkillsForBEService)
  readonly #httpClient = inject(HttpClient)
  readonly #loadingNotifierService = inject(LoadingNotifierService)
  readonly #localeSwitcherService = inject(LocaleSwitcherService)

  readonly #getPeriodTextFnMap: ReadonlyMap<AppLocale, GetPeriodTextFn> = new Map<AppLocale, GetPeriodTextFn>([
    ['EN', LocaleUtil.getPeriodTextWithENLocalization.bind(LocaleUtil)],
    ['RU', LocaleUtil.getPeriodTextWithRULocalization.bind(LocaleUtil)],
  ])

  public readSectionParametersAndList(): Observable<DXActivitiesSectionParametersAndList> {
    return this.#readSectionParametersAndListAsCompiled().pipe(
      catchError(
        (): Observable<DXActivitiesSectionParametersAndList> => this.#readSectionParametersAndListAsUncompiled(),
      ),
      tap((): void => {
        this.#loadingNotifierService.setProcessLoading(createProcessCodename('compiled/dxActivities/section'), false)
        this.#loadingNotifierService.setProcessLoading(createProcessCodename('sections/dxActivities'), false)
      }),
    )
  }

  #calculatePeriodTo(periodTo: string | null): number {
    if (periodTo === null) return Infinity
    const endOfMonth = new Date(periodTo)
    endOfMonth.setMonth(endOfMonth.getMonth() + 1)
    endOfMonth.setDate(-1)
    return +endOfMonth
  }

  #chooseGetPeriodTextFn(locale: AppLocale): GetPeriodTextFn {
    const getPeriodTextFn = this.#getPeriodTextFnMap.get(locale)
    assertDefined<GetPeriodTextFn>(
      getPeriodTextFn,
      `[DXActivitiesSectionMediatorService] Wrong data. The locale ('${locale}') does not exist.`,
    )
    return getPeriodTextFn
  }

  #prepareList(
    dxActivities: DXActivitiesForBE,
    dxActivitySkills: DXActivitySkillsForBE,
    locale: AppLocale,
    queryItems: DXActivitiesSectionParametersForBE['list']['query']['items'],
  ): readonly DXActivitiesListItem[] {
    const dxActivitySkillsMap: ReadonlyMap<DXActivitySkillForBE['codename'], DXActivitySkillForBE['title']> = new Map(
      dxActivitySkills.map<[DXActivitySkillForBE['codename'], DXActivitySkillForBE['title']]>(({ codename, title }) => [
        codename,
        title,
      ]),
    )
    return this.#queryDXActivities(dxActivities, queryItems)
      .map((activityForBE: DXActivityForBE): DXActivitiesSectionMediatorListItem => {
        const codename = activityForBE.codename as DXActivityCodename
        const period = this.#chooseGetPeriodTextFn(locale)(activityForBE.periodFrom, activityForBE.periodTo)
        const periodFrom = Date.parse(activityForBE.periodFrom)
        const periodTo = this.#calculatePeriodTo(activityForBE.periodTo)
        const skills = activityForBE.skillCodenames
          .map((codename: string): string => {
            const skillTitle = dxActivitySkillsMap.get(codename)
            assertDefined<string>(
              skillTitle,
              `[DXActivitiesSectionMediatorService] Wrong data. The DX activity skill codename ('${codename}') does not exist.`,
            )
            return skillTitle
          })
          .sort()
        const { achievements, role, shortDescription } = activityForBE
        return {
          achievements,
          codename,
          period,
          periodFrom,
          periodTo,
          role,
          shortDescription,
          skills,
        }
      })
      .sort((a: DXActivitiesSectionMediatorListItem, b: DXActivitiesSectionMediatorListItem): number => {
        const periodFromDelta = b.periodFrom - a.periodFrom
        if (periodFromDelta !== 0) return periodFromDelta
        const periodToDelta = b.periodTo - a.periodTo
        return !Number.isNaN(periodToDelta) ? periodToDelta : 0
      })
      .map<DXActivitiesListItem>(({ achievements, codename, period, role, shortDescription, skills }) => ({
        achievements,
        codename,
        period,
        role,
        shortDescription,
        skills,
      }))
  }

  #queryDXActivities(
    dxActivities: DXActivitiesForBE,
    queryItems: DXActivitiesSectionParametersForBE['list']['query']['items'],
  ): DXActivitiesForBE {
    const dxActivitiesMap: ReadonlyMap<DXActivityForBE['codename'], DXActivityForBE> = new Map(
      dxActivities.map<[DXActivityForBE['codename'], DXActivityForBE]>((dxActivity) => [
        dxActivity.codename,
        dxActivity,
      ]),
    )
    return queryItems.map(
      ({ codename }: DXActivitiesSectionParametersForBE['list']['query']['items'][number]): DXActivityForBE => {
        const dxActivity = dxActivitiesMap.get(codename)
        assertDefined<DXActivityForBE>(
          dxActivity,
          `[DXActivitiesSectionMediatorService] Wrong data. The codename ('${codename}') does not exist.`,
        )
        return dxActivity
      },
    )
  }

  #readDXActivitiesAsCompiled(dxActivitiesURL: string): Observable<DXActivitiesCompiledForBE> {
    return this.#dxActivitiesCompiledForBEService.readList(dxActivitiesURL)
  }

  #readDXActivitiesAsUncompiled(dxActivitiesURL: string): Observable<DXActivitiesForBE> {
    return this.#dxActivitiesForBEService.readList(dxActivitiesURL)
  }

  #readDXActivitySkillsAsUncompiled(dxActivitySkillsURL: string): Observable<DXActivitySkillsForBE> {
    return this.#dxActivitySkillsForBEService.readList(dxActivitySkillsURL)
  }

  #readSectionParametersAsCompiled(
    dxActivitiesSectionURL: string,
  ): Observable<DXActivitiesCompiledSectionParametersForBE> {
    return this.#dxActivitiesCompiledForBEService.readSectionParameters(dxActivitiesSectionURL)
  }

  #readSectionParametersAsUncompiled(dxActivitiesSectionURL: string): Observable<DXActivitiesSectionParametersForBE> {
    return this.#httpClient.get<DXActivitiesSectionParametersForBE>(dxActivitiesSectionURL)
  }

  #readSectionParametersAndListAsCompiled(): Observable<DXActivitiesSectionParametersAndList> {
    type SectionParametersAndList = [DXActivitiesCompiledSectionParametersForBE, DXActivitiesCompiledForBE]

    const sectionParametersAndList = this.#readURLForCompiled().pipe(
      switchMap((dxActivitiesSectionURL: string): Observable<DXActivitiesCompiledSectionParametersForBE> => {
        return this.#readSectionParametersAsCompiled(dxActivitiesSectionURL)
      }),
      switchMap(
        (
          parametersFromBEAPI: DXActivitiesCompiledSectionParametersForBE,
        ): Observable<[DXActivitiesCompiledSectionParametersForBE, DXActivitiesCompiledForBE]> => {
          const dxActivitiesURL = prepareProfileDataBEAPIURL(parametersFromBEAPI.list.sourceRelativeURL)

          return this.#readDXActivitiesAsCompiled(dxActivitiesURL).pipe(
            map<DXActivitiesCompiledForBE, SectionParametersAndList>((dxActivities) => [
              parametersFromBEAPI,
              dxActivities,
            ]),
          )
        },
      ),
    )

    return sectionParametersAndList.pipe(
      map<SectionParametersAndList, DXActivitiesSectionParametersAndList>(
        ([parametersFromBEAPI, dxActivities]): DXActivitiesSectionParametersAndList => {
          const list = dxActivities.map<DXActivitiesListItem>(
            ({ achievements, codename, period, role, shortDescription, skills }) => ({
              achievements,
              codename: codename as DXActivityCodename,
              period,
              role,
              shortDescription,
              skills,
            }),
          )
          const sectionParameters: DXActivitiesSectionParameters = {
            descriptionText: parametersFromBEAPI.descriptionText,
            list: {
              emptyStateText: parametersFromBEAPI.list.emptyStateText,
              item: {
                achievementsTitleText: parametersFromBEAPI.list.item.achievementsTitleText,
                skillsTitleText: parametersFromBEAPI.list.item.skillsTitleText,
              },
            },
            titleText: parametersFromBEAPI.titleText,
          }
          return { list, sectionParameters }
        },
      ),
    )
  }

  #readSectionParametersAndListAsUncompiled(): Observable<DXActivitiesSectionParametersAndList> {
    type SectionParametersAndLists = [DXActivitiesSectionParametersForBE, DXActivitiesForBE, DXActivitySkillsForBE]

    const sectionParametersAndLists = this.#readURLForUncompiled().pipe(
      switchMap((dxActivitiesSectionURL: string): Observable<DXActivitiesSectionParametersForBE> => {
        return this.#readSectionParametersAsUncompiled(dxActivitiesSectionURL)
      }),
      switchMap(
        (
          parametersFromBEAPI: DXActivitiesSectionParametersForBE,
        ): Observable<[DXActivitiesSectionParametersForBE, DXActivitiesForBE, DXActivitySkillsForBE]> => {
          const dxActivitiesURL = prepareProfileDataBEAPIURL(parametersFromBEAPI.list.sourceRelativeURL)
          const dxActivitySkillsURL = prepareProfileDataBEAPIURL(
            parametersFromBEAPI.list.query.skills.sourceRelativeURL,
          )
          type EntitiesLists = [DXActivitiesForBE, DXActivitySkillsForBE]

          return combineLatest([
            this.#readDXActivitiesAsUncompiled(dxActivitiesURL),
            this.#readDXActivitySkillsAsUncompiled(dxActivitySkillsURL),
          ]).pipe(
            map<EntitiesLists, SectionParametersAndLists>(([dxActivities, dxActivitySkills]) => [
              parametersFromBEAPI,
              dxActivities,
              dxActivitySkills,
            ]),
          )
        },
      ),
    )

    return zip([this.#localeSwitcherService.locale, sectionParametersAndLists]).pipe(
      map<[AppLocale, SectionParametersAndLists], DXActivitiesSectionParametersAndList>(
        ([locale, [parametersFromBEAPI, dxActivities, dxActivitySkills]]): DXActivitiesSectionParametersAndList => {
          const list = this.#prepareList(dxActivities, dxActivitySkills, locale, parametersFromBEAPI.list.query.items)
          const sectionParameters: DXActivitiesSectionParameters = {
            descriptionText: parametersFromBEAPI.descriptionText,
            list: {
              emptyStateText: parametersFromBEAPI.list.emptyStateText,
              item: {
                achievementsTitleText: parametersFromBEAPI.list.item.achievementsTitleText,
                skillsTitleText: parametersFromBEAPI.list.item.skillsTitleText,
              },
            },
            titleText: parametersFromBEAPI.titleText,
          }
          return { list, sectionParameters }
        },
      ),
    )
  }

  #readURLForCompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('compiled/dxActivities/section').pipe(
      tap((): void => {
        this.#loadingNotifierService.setProcessLoading(createProcessCodename('compiled/dxActivities/section'), true)
      }),
    )
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/dxActivities').pipe(
      tap((): void => {
        this.#loadingNotifierService.setProcessLoading(createProcessCodename('sections/dxActivities'), true)
      }),
    )
  }
}

type DXActivitiesCompiledForBE = readonly DXActivityCompiledForBE[]
type DXActivitiesForBE = readonly DXActivityForBE[]
type DXActivitySkillsForBE = readonly DXActivitySkillForBE[]
type GetPeriodTextFn = (start: string, end: string | null) => string

interface DXActivitiesSectionMediatorListItem {
  readonly achievements: DXActivity['achievements']
  readonly codename: DXActivityCodename
  readonly period: string
  readonly periodFrom: number
  readonly periodTo: number
  readonly role: DXActivity['role']
  readonly shortDescription: DXActivity['shortDescription']
  readonly skills: readonly string[]
}

function createProcessCodename(string: string): string {
  return `DXActivitiesSectionMediatorService ${string}`
}
