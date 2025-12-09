import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { type Observable, switchMap } from 'rxjs'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import type { EventOrganizationSectionParametersForBE } from '~be/event-organization/event-organization-section-for-be.type'
import type { EventOrganizationSectionParameters } from '~ui/event-organization/event-organization-section/event-organization-section.type'

@Injectable({
  providedIn: 'root',
})
export class EventOrganizationSectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #httpClient = inject(HttpClient)

  public readSectionParameters(): Observable<EventOrganizationSectionParameters> {
    return this.#readSectionParametersAsUncompiled()
  }

  #readSectionParametersAsUncompiled(): Observable<EventOrganizationSectionParametersForBE> {
    return this.#readURLForUncompiled().pipe(
      switchMap((url: string): Observable<EventOrganizationSectionParametersForBE> => {
        return this.#readSectionParametersAsUncompiledByURL(url)
      }),
    )
  }

  #readSectionParametersAsUncompiledByURL(url: string): Observable<EventOrganizationSectionParametersForBE> {
    return this.#httpClient.get<EventOrganizationSectionParametersForBE>(url)
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/eventOrganization')
  }
}
