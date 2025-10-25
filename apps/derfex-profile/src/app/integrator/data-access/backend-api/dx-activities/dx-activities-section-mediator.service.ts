import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { combineLatest, map, type Observable, switchMap } from 'rxjs'
import { assertDefined } from '~app/dev/dev-error.util'
import { prepareProfileDataBEAPIURL } from '~be/backend-api-configuration/backend-api-configuration'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import { DXActivitiesForBEService } from '~be/dx-activities/dx-activities-for-be.service'
import type { DXActivitiesSectionParametersForBE, DXActivityForBE } from '~be/dx-activities/dx-activities-for-be.type'
import { DXActivitySkillsForBEService } from '~be/dx-activities/dx-activity-skills-for-be.service'
import type { DXActivitySkillForBE } from '~be/dx-activities/dx-activity-skills-for-be.type'
import type { DXActivityCodename } from '~entities/dx-activity/dx-activity.type'
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
  readonly #httpClient = inject(HttpClient)
  readonly #dxActivitiesForBEService = inject(DXActivitiesForBEService)
  readonly #dxActivitySkillsForBEService = inject(DXActivitySkillsForBEService)

  public readSectionParametersAndList(): Observable<DXActivitiesSectionParametersAndList> {
    interface Lists {
      readonly dxActivities: DXActivitiesForBE
      readonly dxActivitySkills: DXActivitySkillsForBE
    }

    return this.#readURL().pipe(
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
          // FIXME?: Deprecated?
          return combineLatest({
            dxActivities: this.#readDXActivities(dxActivitiesURL),
            dxActivitySkills: this.#readDXActivitySkills(dxActivitySkillsURL),
          }).pipe(
            map<Lists, [DXActivitiesSectionParametersForBE, DXActivitiesForBE, DXActivitySkillsForBE]>(
              ({ dxActivities, dxActivitySkills }) => [parametersFromBEAPI, dxActivities, dxActivitySkills],
            ),
          )
        },
      ),
      map<
        [DXActivitiesSectionParametersForBE, DXActivitiesForBE, DXActivitySkillsForBE],
        DXActivitiesSectionParametersAndList
      >(([parametersFromBEAPI, dxActivities, dxActivitySkillsURL]): DXActivitiesSectionParametersAndList => {
        const list = this.#prepareList(dxActivities, dxActivitySkillsURL)
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
      }),
    )
  }

  #prepareList(
    dxActivities: DXActivitiesForBE,
    dxActivitySkills: DXActivitySkillsForBE,
  ): readonly DXActivitiesListItem[] | never {
    const dxActivitySkillsMap: ReadonlyMap<DXActivitySkillForBE['codename'], DXActivitySkillForBE['title']> = new Map(
      dxActivitySkills.map<[DXActivitySkillForBE['codename'], DXActivitySkillForBE['title']]>(({ codename, title }) => [
        codename,
        title,
      ]),
    )
    return dxActivities
      .map((activityForBE: DXActivityForBE): DXActivitiesListItem => {
        const codename = activityForBE.codename as DXActivityCodename
        const periodFrom = new Date(activityForBE.periodFrom)
        const periodTo = activityForBE.periodTo ? new Date(activityForBE.periodTo) : null
        const period = LocaleUtil.getPeriodTextWithRULocalization(periodFrom, periodTo)
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
          results,
          role,
          shortDescription,
          skills,
        }
      })
      // TODO: Implement the sorting.
      // .sort((a: DXActivitiesListItem, b: DXActivitiesListItem): number => +b.periodFrom - +a.periodFrom)
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

  #readURL(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/dxActivities')
  }
}

type DXActivitiesForBE = readonly DXActivityForBE[]
type DXActivitySkillsForBE = readonly DXActivitySkillForBE[]
