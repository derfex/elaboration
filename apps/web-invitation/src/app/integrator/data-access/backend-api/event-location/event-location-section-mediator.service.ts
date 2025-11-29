import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, switchMap } from 'rxjs'
import { prepareWebInvitationDataCDNURL } from '~be/backend-api-configuration/backend-api-configuration'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import type { EventLocationSectionParametersForBE } from '~be/event-location/event-location-section-for-be.type'
import type { EventLocationSectionParameters } from '~ui/event-location/event-location-section/event-location-section.type'

@Injectable({
  providedIn: 'root',
})
export class EventLocationSectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #httpClient = inject(HttpClient)

  public readSectionParameters(): Observable<EventLocationSectionParameters> {
    return this.#readSectionParametersAsUncompiled().pipe(
      map<EventLocationSectionParametersForBE, EventLocationSectionParameters>((parameters) =>
        this.#convertSectionParameters(parameters),
      ),
    )
  }

  #convertSectionParameters({
    descriptionParagraphs,
    illustrationCaptionText,
    illustrationImageAltText,
    illustrationImageHeight,
    illustrationImageRelativeURL,
    illustrationImageWidth,
    locationURL,
    ornament,
    showMapButtonText,
    titleText,
    transferParagraphs,
  }: EventLocationSectionParametersForBE): EventLocationSectionParameters {
    return {
      descriptionParagraphs,
      illustrationCaptionText,
      illustrationImageAltText,
      illustrationImageHeight,
      illustrationImageURL: prepareWebInvitationDataCDNURL(illustrationImageRelativeURL),
      illustrationImageWidth,
      locationURL,
      ornament,
      showMapButtonText,
      titleText,
      transferParagraphs,
    }
  }

  #readSectionParametersAsUncompiled(): Observable<EventLocationSectionParametersForBE> {
    return this.#readURLForUncompiled().pipe(
      switchMap((url: string): Observable<EventLocationSectionParametersForBE> => {
        return this.#readSectionParametersAsUncompiledByURL(url)
      }),
    )
  }

  #readSectionParametersAsUncompiledByURL(url: string): Observable<EventLocationSectionParametersForBE> {
    return this.#httpClient.get<EventLocationSectionParametersForBE>(url)
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/eventLocation')
  }
}
