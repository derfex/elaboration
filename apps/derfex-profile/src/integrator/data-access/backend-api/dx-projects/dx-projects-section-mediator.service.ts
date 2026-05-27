import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, switchMap, tap } from 'rxjs'
import { prepareProfileDataBEAPIURL } from '~be/backend-api-configuration/backend-api-configuration'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import { DXProjectsForBEService } from '~be/dx-projects/dx-projects-for-be.service'
import type { DXProjectForBE, DXProjectsSectionParametersForBE } from '~be/dx-projects/dx-projects-for-be.type'
import type { DXProject, DXProjectCodename } from '~entities/dx-projects/dx-projects.type'
import { LoadingNotifierService } from '~integrator/data-access/loading-notifier/loading-notifier.service'
import type {
  DXProjectsSectionParameters,
  DXProjectsSectionParametersAndList,
} from '~ui/dx-projects/dx-projects-section/dx-projects-section.type'
import type { DXProjectsListItem } from '~ui/dx-projects/dx-projects/dx-projects.type'

@Injectable({
  providedIn: 'root',
})
export class DXProjectsSectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #dxProjectsForBEService = inject(DXProjectsForBEService)
  readonly #httpClient = inject(HttpClient)
  readonly #loadingNotifierService = inject(LoadingNotifierService)

  public readSectionParametersAndList(): Observable<DXProjectsSectionParametersAndList> {
    return this.#readSectionParametersAndListAsUncompiled().pipe(
      tap((): void => {
        this.#loadingNotifierService.setProcessLoading(createProcessCodename('sections/dxProjects'), false)
      }),
    )
  }

  #prepareList(dxProjects: DXProjectsForBE): readonly DXProjectsListItem[] {
    return dxProjects.map((projectForBE: DXProjectForBE): DXProjectsSectionMediatorListItem => {
      const codename = projectForBE.codename as DXProjectCodename
      const { name, resultURL, sourceURL } = projectForBE
      return {
        codename,
        name,
        resultURL,
        sourceURL,
      }
    })
  }

  #readDXProjectsAsUncompiled(dxProjectsURL: string): Observable<DXProjectsForBE> {
    return this.#dxProjectsForBEService.readList(dxProjectsURL)
  }

  #readSectionParametersAsUncompiled(dxProjectsSectionURL: string): Observable<DXProjectsSectionParametersForBE> {
    return this.#httpClient.get<DXProjectsSectionParametersForBE>(dxProjectsSectionURL)
  }

  #readSectionParametersAndListAsUncompiled(): Observable<DXProjectsSectionParametersAndList> {
    type SectionParametersAndList = [DXProjectsSectionParametersForBE, DXProjectsForBE]

    const sectionParametersAndLists = this.#readURLForUncompiled().pipe(
      switchMap((dxProjectsSectionURL: string): Observable<DXProjectsSectionParametersForBE> => {
        return this.#readSectionParametersAsUncompiled(dxProjectsSectionURL)
      }),
      switchMap(
        (
          parametersFromBEAPI: DXProjectsSectionParametersForBE,
        ): Observable<[DXProjectsSectionParametersForBE, DXProjectsForBE]> => {
          const dxProjectsURL = prepareProfileDataBEAPIURL(parametersFromBEAPI.list.sourceRelativeURL)

          return this.#readDXProjectsAsUncompiled(dxProjectsURL).pipe(
            map<DXProjectsForBE, SectionParametersAndList>((dxProjects) => [parametersFromBEAPI, dxProjects]),
          )
        },
      ),
    )

    return sectionParametersAndLists.pipe(
      map<SectionParametersAndList, DXProjectsSectionParametersAndList>(
        ([parametersFromBEAPI, dxProjects]): DXProjectsSectionParametersAndList => {
          const list = this.#prepareList(dxProjects)
          const sectionParameters: DXProjectsSectionParameters = {
            descriptionText: parametersFromBEAPI.descriptionText,
            list: {
              emptyStateText: parametersFromBEAPI.list.emptyStateText,
              item: {
                resultTitleText: parametersFromBEAPI.list.item.resultTitleText,
                sourceCodeTitleText: parametersFromBEAPI.list.item.sourceCodeTitleText,
              },
            },
            titleText: parametersFromBEAPI.titleText,
          }
          return { list, sectionParameters }
        },
      ),
    )
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/dxProjects').pipe(
      tap((): void => {
        this.#loadingNotifierService.setProcessLoading(createProcessCodename('sections/dxProjects'), true)
      }),
    )
  }
}

type DXProjectsForBE = readonly DXProjectForBE[]
interface DXProjectsSectionMediatorListItem {
  readonly codename: DXProjectCodename
  readonly name: DXProject['name']
  readonly resultURL: DXProject['resultURL']
  readonly sourceURL: DXProject['sourceURL']
}

function createProcessCodename(string: string): string {
  return `DXProjectsSectionMediatorService ${string}`
}
