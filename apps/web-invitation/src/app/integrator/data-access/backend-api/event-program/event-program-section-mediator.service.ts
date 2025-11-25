import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, switchMap } from 'rxjs'
import { prepareWebInvitationDataBEAPIURL } from '~be/backend-api-configuration/backend-api-configuration'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import type {
  EventProgramSectionParametersForBE,
  EventProgramStageForBE,
} from '~be/event-program/event-program-stages-for-be.type'
import type {
  EventProgramSectionParameters,
  EventProgramSectionParametersAndList,
} from '~ui/event-program/event-program-section/event-program-section.type'

@Injectable({
  providedIn: 'root',
})
export class EventProgramSectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #httpClient = inject(HttpClient)

  public readSectionParametersAndList(): Observable<EventProgramSectionParametersAndList> {
    return this.#readSectionParametersAndList()
  }

  #readSectionParametersAndList(): Observable<EventProgramSectionParametersAndList> {
    type SectionParametersAndList = [EventProgramSectionParametersForBE, EventProgramStagesForBE]

    const sectionParametersAndLists = this.#readSectionParametersAsUncompiled().pipe(
      switchMap((parametersFromBEAPI: EventProgramSectionParametersForBE): Observable<SectionParametersAndList> => {
        const eventProgramStagesURL = prepareWebInvitationDataBEAPIURL(parametersFromBEAPI.list.sourceRelativeURL)

        return this.#readListAsUncompiledByURL(eventProgramStagesURL).pipe(
          map<EventProgramStagesForBE, SectionParametersAndList>((dxProjects) => [parametersFromBEAPI, dxProjects]),
        )
      }),
    )

    return sectionParametersAndLists.pipe(
      map<SectionParametersAndList, EventProgramSectionParametersAndList>(
        ([parametersFromBEAPI, stages]): EventProgramSectionParametersAndList => {
          const list = stages
          const sectionParameters: EventProgramSectionParameters = {
            titleText: parametersFromBEAPI.titleText,
          }
          return { list, sectionParameters }
        },
      ),
    )
  }

  #readListAsUncompiledByURL(url: string): Observable<EventProgramStagesForBE> {
    return this.#httpClient.get<EventProgramStagesForBE>(url)
  }

  #readSectionParametersAsUncompiled(): Observable<EventProgramSectionParametersForBE> {
    return this.#readURLForUncompiled().pipe(
      switchMap((url: string): Observable<EventProgramSectionParametersForBE> => {
        return this.#readSectionParametersAsUncompiledByURL(url)
      }),
    )
  }

  #readSectionParametersAsUncompiledByURL(url: string): Observable<EventProgramSectionParametersForBE> {
    return this.#httpClient.get<EventProgramSectionParametersForBE>(url)
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/eventProgram')
  }
}

type EventProgramStagesForBE = readonly EventProgramStageForBE[]
