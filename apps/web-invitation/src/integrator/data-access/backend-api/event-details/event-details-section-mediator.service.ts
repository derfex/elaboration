import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, switchMap } from 'rxjs'
import { prepareWebInvitationDataCDNURL } from '~be/backend-api-configuration/backend-api-configuration'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import type {
  EventDetailsSectionParametersForBE,
  EventDetailsSectionParametersWishForBE,
} from '~be/event-details/event-details-section-for-be.type'
import type { EventDetailsSectionParameters } from '~ui/event-details/event-details-section/event-details-section.type'

@Injectable({
  providedIn: 'root',
})
export class EventDetailsSectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #httpClient = inject(HttpClient)

  public readSectionParameters(): Observable<EventDetailsSectionParameters> {
    return this.#readSectionParametersAsUncompiled().pipe(
      map<EventDetailsSectionParametersForBE, EventDetailsSectionParameters>(this.#convertSectionParameters.bind(this)),
    )
  }

  #convertSectionParameters({
    descriptionParagraphs,
    titleText,
    wishes,
  }: EventDetailsSectionParametersForBE): EventDetailsSectionParameters {
    return {
      descriptionParagraphs,
      titleText,
      wishes: wishes.map(this.#convertSectionParametersWish.bind(this)),
    }
  }

  #convertSectionParametersWish({
    iconImageRelativeURL,
    text,
  }: EventDetailsSectionParametersWishForBE): EventDetailsSectionParameters['wishes'][number] {
    if (!iconImageRelativeURL) return { text }
    return {
      iconImageURL: prepareWebInvitationDataCDNURL(iconImageRelativeURL),
      text,
    }
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
