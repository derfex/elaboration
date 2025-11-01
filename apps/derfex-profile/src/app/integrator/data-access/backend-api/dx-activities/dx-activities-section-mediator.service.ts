import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, combineLatest, map, type Observable, switchMap, zip } from 'rxjs'
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
import type { DXActivity, DXActivityCodename } from '~entities/dx-activity/dx-activity.type'
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
  readonly #localeSwitcherService = inject(LocaleSwitcherService)

  readonly #getPeriodTextFnMap: ReadonlyMap<AppLocale, GetPeriodTextFn> = new Map<AppLocale, GetPeriodTextFn>([
    ['EN', LocaleUtil.getPeriodTextWithENLocalization.bind(LocaleUtil)],
    ['RU', LocaleUtil.getPeriodTextWithRULocalization.bind(LocaleUtil)],
  ])

  public readSectionParametersAndList(): Observable<DXActivitiesSectionParametersAndList> {
    return this.#readSectionParametersAndListAsCompiled()
      .pipe(
        catchError(() => this.#readSectionParametersAndListAsUncompiled())
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
  ): readonly DXActivitiesListItem[] {
    const dxActivitySkillsMap: ReadonlyMap<DXActivitySkillForBE['codename'], DXActivitySkillForBE['title']> = new Map(
      dxActivitySkills.map<[DXActivitySkillForBE['codename'], DXActivitySkillForBE['title']]>(({ codename, title }) => [
        codename,
        title,
      ]),
    )
    return dxActivities
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
        const { results, role, shortDescription } = activityForBE
        return {
          codename,
          period,
          periodFrom,
          periodTo,
          results,
          role,
          shortDescription,
          skills,
        }
      })
      .sort(
        (a: DXActivitiesSectionMediatorListItem, b: DXActivitiesSectionMediatorListItem): number => {
          const periodFromDelta = b.periodFrom - a.periodFrom
          if (periodFromDelta !== 0) return periodFromDelta
          const periodToDelta = b.periodTo - a.periodTo
          return !Number.isNaN(periodToDelta) ? periodToDelta : 0
        }
      )
      .map<DXActivitiesListItem>(({ codename, period, results, role, shortDescription, skills }) => ({
        codename,
        period,
        results,
        role,
        shortDescription,
        skills,
      }))
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

  #readSectionParametersAsCompiled(dxActivitiesSectionURL: string): Observable<DXActivitiesCompiledSectionParametersForBE> {
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
          const list = dxActivities.map<DXActivitiesListItem>(({ codename, period, results, role, shortDescription, skills }) => ({
            codename: codename as DXActivityCodename,
            period,
            results,
            role,
            shortDescription,
            skills,
          }))
          const sectionParameters: DXActivitiesSectionParameters = {
            descriptionText: parametersFromBEAPI.descriptionText,
            list: {
              emptyStateText: parametersFromBEAPI.list.emptyStateText,
              item: {
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
          const list = this.#prepareList(dxActivities, dxActivitySkills, locale)
          const sectionParameters: DXActivitiesSectionParameters = {
            descriptionText: parametersFromBEAPI.descriptionText,
            list: {
              emptyStateText: parametersFromBEAPI.list.emptyStateText,
              item: {
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
    return this.#backendAPIConfigurationService.readURL('compiled/dxActivities/section')
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/dxActivities')
  }
}

type DXActivitiesCompiledForBE = readonly DXActivityCompiledForBE[]
type DXActivitiesForBE = readonly DXActivityForBE[]
type DXActivitySkillsForBE = readonly DXActivitySkillForBE[]
type GetPeriodTextFn = (start: string, end: string | null) => string

interface DXActivitiesSectionMediatorListItem {
  readonly codename: DXActivityCodename
  readonly period: string
  readonly periodFrom: number
  readonly periodTo: number
  readonly results: DXActivity['results']
  readonly role: DXActivity['role']
  readonly shortDescription: DXActivity['shortDescription']
  readonly skills: readonly string[]
}
