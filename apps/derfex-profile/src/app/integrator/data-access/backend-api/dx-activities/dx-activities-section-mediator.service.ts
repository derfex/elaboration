import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { combineLatest, map, type Observable, switchMap, zip } from 'rxjs'
import { assertDefined } from '~app/dev/dev-error.util'
import { prepareProfileDataBEAPIURL } from '~be/backend-api-configuration/backend-api-configuration'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
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
  readonly #dxActivitiesForBEService = inject(DXActivitiesForBEService)
  readonly #dxActivitySkillsForBEService = inject(DXActivitySkillsForBEService)
  readonly #httpClient = inject(HttpClient)
  readonly #localeSwitcherService = inject(LocaleSwitcherService)

  readonly #getPeriodTextFnMap: ReadonlyMap<AppLocale, GetPeriodTextFn> = new Map<AppLocale, GetPeriodTextFn>([
    ['EN', LocaleUtil.getPeriodTextWithENLocalization.bind(LocaleUtil)],
    ['RU', LocaleUtil.getPeriodTextWithRULocalization.bind(LocaleUtil)],
  ])

  public readSectionParametersAndList(): Observable<DXActivitiesSectionParametersAndList> {
    return this.#readSectionParametersAndListAsUncompiled()
  }

  #readSectionParametersAndListAsUncompiled(): Observable<DXActivitiesSectionParametersAndList> {
    type SectionParametersAndLists = [DXActivitiesSectionParametersForBE, DXActivitiesForBE, DXActivitySkillsForBE]

    const sectionParametersAndLists = this.#readURLForUncompiled().pipe(
      switchMap((dxActivitiesSectionURL: string): Observable<DXActivitiesSectionParametersForBE> => {
        return this.#readSectionParameters(dxActivitiesSectionURL)
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
            this.#readDXActivities(dxActivitiesURL),
            this.#readDXActivitySkills(dxActivitySkillsURL),
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
        ([locale, [parametersFromBEAPI, dxActivities, dxActivitySkillsURL]]): DXActivitiesSectionParametersAndList => {
          const list = this.#prepareList(dxActivities, dxActivitySkillsURL, locale)
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

  #calculatePeriodTo(periodTo: string | null): number | null {
    if (periodTo === null) return null
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
        (a: DXActivitiesSectionMediatorListItem, b: DXActivitiesSectionMediatorListItem): number =>
          +b.periodFrom - +a.periodFrom,
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

  #readDXActivities(dxActivitiesURL: string): Observable<DXActivitiesForBE> {
    return this.#dxActivitiesForBEService.readList(dxActivitiesURL)
  }

  #readDXActivitySkills(dxActivitySkillsURL: string): Observable<DXActivitySkillsForBE> {
    return this.#dxActivitySkillsForBEService.readList(dxActivitySkillsURL)
  }

  #readSectionParameters(dxActivitiesSectionURL: string): Observable<DXActivitiesSectionParametersForBE> {
    return this.#httpClient.get<DXActivitiesSectionParametersForBE>(dxActivitiesSectionURL)
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/dxActivities')
  }
}

type DXActivitiesForBE = readonly DXActivityForBE[]
type DXActivitySkillsForBE = readonly DXActivitySkillForBE[]
type GetPeriodTextFn = (start: string, end: string | null) => string

interface DXActivitiesSectionMediatorListItem {
  readonly codename: DXActivityCodename
  readonly period: string
  readonly periodFrom: number
  readonly periodTo: number | null
  readonly results: DXActivity['results']
  readonly role: DXActivity['role']
  readonly shortDescription: DXActivity['shortDescription']
  readonly skills: readonly string[]
}
