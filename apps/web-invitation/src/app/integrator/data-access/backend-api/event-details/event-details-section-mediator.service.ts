import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, switchMap } from 'rxjs'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import type { EventDetailsSectionParametersForBE } from '~be/event-details/event-details-section-for-be.type'
import type { EventDetailsSectionParameters } from '~ui/event-details/event-details-section/event-details-section.type'

@Injectable({
  providedIn: 'root',
})
export class EventDetailsSectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #httpClient = inject(HttpClient)

  public readSectionParameters(): Observable<EventDetailsSectionParameters> {
    return this.#readSectionParametersAsUncompiled().pipe(
      map<EventDetailsSectionParametersForBE, EventDetailsSectionParameters>(
        ({ descriptionParagraphs, titleText, wishes }) => ({
          descriptionParagraphs,
          titleText,
          wishes,
        }),
      ),
    )
  }

  #readSectionParametersAsUncompiled(): Observable<EventDetailsSectionParametersForBE> {
    return this.#readURLForUncompiled().pipe(
      switchMap((url: string): Observable<EventDetailsSectionParametersForBE> => {
        return this.#readSectionParametersAsUncompiledByURL(url)
      }),
    )
  }

  #readSectionParametersAsUncompiledByURL(url: string): Observable<EventDetailsSectionParametersForBE> {
    return this.#httpClient.get<EventDetailsSectionParametersForBE>(url)
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/eventDetails')
  }
}
