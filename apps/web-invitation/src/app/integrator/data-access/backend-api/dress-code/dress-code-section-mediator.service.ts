import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, switchMap } from 'rxjs'
import { prepareWebInvitationDataCDNURL } from '~be/backend-api-configuration/backend-api-configuration'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import type { DressCodeSectionParametersForBE } from '~be/dress-code/dress-code-section-for-be.type'
import type { DressCodeSectionParameters } from '~ui/dress-code/dress-code-section/dress-code-section.type'

@Injectable({
  providedIn: 'root',
})
export class DressCodeSectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #httpClient = inject(HttpClient)

  public readSectionParameters(): Observable<DressCodeSectionParameters> {
    return this.#readSectionParametersAsUncompiled().pipe(
      map<DressCodeSectionParametersForBE, DressCodeSectionParameters>(this.#convertSectionParameters.bind(this)),
    )
  }

  #convertSectionParameters({
    descriptionParagraphs,
    illustration: {
      imageAltText,
      imageHeight,
      imageRelativeURL,
      imageWidth,
    },
    titleText,
    tints,
  }: DressCodeSectionParametersForBE): DressCodeSectionParameters {
    const illustration = {
      imageAltText,
      imageHeight,
      imageURL: prepareWebInvitationDataCDNURL(imageRelativeURL),
      imageWidth,
    }
    return {
      descriptionParagraphs,
      illustration,
      tints,
      titleText,
    }
  }

  #readSectionParametersAsUncompiled(): Observable<DressCodeSectionParametersForBE> {
    return this.#readURLForUncompiled().pipe(
      switchMap((url: string): Observable<DressCodeSectionParametersForBE> => {
        return this.#readSectionParametersAsUncompiledByURL(url)
      }),
    )
  }

  #readSectionParametersAsUncompiledByURL(url: string): Observable<DressCodeSectionParametersForBE> {
    return this.#httpClient.get<DressCodeSectionParametersForBE>(url)
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/dressCode')
  }
}
