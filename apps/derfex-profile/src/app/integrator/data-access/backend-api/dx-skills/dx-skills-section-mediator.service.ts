import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, switchMap } from 'rxjs'
import { prepareProfileDataBEAPIURL } from '~be/backend-api-configuration/backend-api-configuration'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import { DXSkillsForBEService } from '~be/dx-skills/dx-skills-for-be.service'
import type { DXSkillForBE, DXSkillsSectionParametersForBE } from '~be/dx-skills/dx-skills-for-be.type'
import type { DXSkill, DXSkillCodename } from '~entities/dx-skills/dx-skills.type'
import type {
  DXSkillsSectionParameters,
  DXSkillsSectionParametersAndList,
} from '~ui/dx-skills/dx-skills-section/dx-skills-section.type'
import type { DXSkillsListItem } from '~ui/dx-skills/dx-skills/dx-skills.type'

@Injectable({
  providedIn: 'root',
})
export class DXSkillsSectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #dxSkillsForBEService = inject(DXSkillsForBEService)
  readonly #httpClient = inject(HttpClient)

  public readSectionParametersAndList(): Observable<DXSkillsSectionParametersAndList> {
    return this.#readSectionParametersAndListAsUncompiled()
  }

  #prepareList(dxSkills: DXSkillsForBE): readonly DXSkillsListItem[] {
    return dxSkills.map((skillForBE: DXSkillForBE): DXSkillsSectionMediatorListItem => {
      const codename = skillForBE.codename as DXSkillCodename
      const { name, url } = skillForBE
      return {
        codename,
        name,
        url,
      }
    })
  }

  #readDXSkillsAsUncompiled(dxSkillsURL: string): Observable<DXSkillsForBE> {
    return this.#dxSkillsForBEService.readList(dxSkillsURL)
  }

  #readSectionParametersAsUncompiled(dxSkillsSectionURL: string): Observable<DXSkillsSectionParametersForBE> {
    return this.#httpClient.get<DXSkillsSectionParametersForBE>(dxSkillsSectionURL)
  }

  #readSectionParametersAndListAsUncompiled(): Observable<DXSkillsSectionParametersAndList> {
    type SectionParametersAndList = [DXSkillsSectionParametersForBE, DXSkillsForBE]

    const sectionParametersAndLists = this.#readURLForUncompiled().pipe(
      switchMap((dxSkillsSectionURL: string): Observable<DXSkillsSectionParametersForBE> => {
        return this.#readSectionParametersAsUncompiled(dxSkillsSectionURL)
      }),
      switchMap(
        (
          parametersFromBEAPI: DXSkillsSectionParametersForBE,
        ): Observable<[DXSkillsSectionParametersForBE, DXSkillsForBE]> => {
          const dxSkillsURL = prepareProfileDataBEAPIURL(parametersFromBEAPI.list.sourceRelativeURL)

          return this.#readDXSkillsAsUncompiled(dxSkillsURL).pipe(
            map<DXSkillsForBE, SectionParametersAndList>((dxSkills) => [parametersFromBEAPI, dxSkills]),
          )
        },
      ),
    )

    return sectionParametersAndLists.pipe(
      map<SectionParametersAndList, DXSkillsSectionParametersAndList>(
        ([parametersFromBEAPI, dxSkills]): DXSkillsSectionParametersAndList => {
          const list = this.#prepareList(dxSkills)
          const sectionParameters: DXSkillsSectionParameters = {
            descriptionText: parametersFromBEAPI.descriptionText,
            list: {
              emptyStateText: parametersFromBEAPI.list.emptyStateText,
            },
            titleText: parametersFromBEAPI.titleText,
          }
          return { list, sectionParameters }
        },
      ),
    )
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/dxSkills')
  }
}

type DXSkillsForBE = readonly DXSkillForBE[]

interface DXSkillsSectionMediatorListItem {
  readonly codename: DXSkillCodename
  readonly name: DXSkill['name']
  readonly url: DXSkill['url']
}
