import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { type Observable, switchMap } from 'rxjs'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import type { GuestQuestionnaireSectionParametersForBE } from '~be/guest-questionnaire/guest-questionnaire-section-for-be.type'
import type { GuestQuestionnaireSectionParameters } from '~ui/guest-questionnaire/guest-questionnaire-section/guest-questionnaire-section.type'

@Injectable({
  providedIn: 'root',
})
export class GuestQuestionnaireSectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #httpClient = inject(HttpClient)

  public readSectionParameters(): Observable<GuestQuestionnaireSectionParameters> {
    return this.#readSectionParametersAsUncompiled()
  }

  #readSectionParametersAsUncompiled(): Observable<GuestQuestionnaireSectionParametersForBE> {
    return this.#readURLForUncompiled().pipe(
      switchMap((url: string): Observable<GuestQuestionnaireSectionParametersForBE> => {
        return this.#readSectionParametersAsUncompiledByURL(url)
      }),
    )
  }

  #readSectionParametersAsUncompiledByURL(url: string): Observable<GuestQuestionnaireSectionParametersForBE> {
    return this.#httpClient.get<GuestQuestionnaireSectionParametersForBE>(url)
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/guestQuestionnaire')
  }
}
