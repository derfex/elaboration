import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, switchMap } from 'rxjs'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import type { EventDaySectionParametersForBE } from '~be/event-day/event-day-section-for-be.type'
import type { EventDaySectionParameters } from '~ui/event-day/event-day-section/event-day-section.type'

@Injectable({
  providedIn: 'root',
})
export class EventDaySectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #httpClient = inject(HttpClient)

  public readSectionParameters(): Observable<EventDaySectionParameters> {
    return this.#readSectionParametersAsUncompiled().pipe(
      map<EventDaySectionParametersForBE, EventDaySectionParameters>(
        (parameters) => ({
          ...parameters,
        }),
      ),
    )
  }

  #readSectionParametersAsUncompiled(): Observable<EventDaySectionParametersForBE> {
    return this.#readURLForUncompiled().pipe(
      switchMap((url: string): Observable<EventDaySectionParametersForBE> => {
        return this.#readSectionParametersAsUncompiledByURL(url)
      }),
    )
  }

  #readSectionParametersAsUncompiledByURL(url: string): Observable<EventDaySectionParametersForBE> {
    return this.#httpClient.get<EventDaySectionParametersForBE>(url)
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/eventDay')
  }
}
