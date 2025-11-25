import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, shareReplay, switchMap } from 'rxjs'
import type { AppSectionsParametersForBE } from '~be/app/app-sections-for-be.type'
import { prepareWebInvitationDataCDNURL } from '~be/backend-api-configuration/backend-api-configuration'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import type { AppFooterSectionParameters } from '~ui/app-footer-section/app-footer-section/app-footer-section.type'
import type { AppHeroSectionParameters } from '~ui/app-hero-section/app-hero-section/app-hero-section.type'

@Injectable({
  providedIn: 'root',
})
export class AppSectionsMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #httpClient = inject(HttpClient)

  readonly #sectionsParameters$: Observable<AppSectionsParametersForBE> =
    this.#readSectionsParametersAsUncompiled().pipe(shareReplay(1))

  public readAppFooterSectionParameters(): Observable<AppFooterSectionParameters> {
    return this.#sectionsParameters$.pipe(
      map<AppSectionsParametersForBE, AppFooterSectionParameters>(({ footer }) => footer),
    )
  }

  public readAppHeroSectionParameters(): Observable<AppHeroSectionParameters> {
    return this.#sectionsParameters$.pipe(
      map<AppSectionsParametersForBE, AppHeroSectionParameters>(({ hero }) => this.#convertHeroSectionParameters(hero)),
    )
  }

  #convertHeroSectionParameters({
    illustrationImageAltText,
    illustrationImageHeight,
    illustrationImageRelativeURL,
    illustrationImageWidth,
    phraseText,
  }: AppSectionsParametersForBE['hero']): AppHeroSectionParameters {
    return {
      illustrationImageAltText,
      illustrationImageHeight,
      illustrationImageURL: prepareWebInvitationDataCDNURL(illustrationImageRelativeURL),
      illustrationImageWidth,
      phraseText,
    }
  }

  #readSectionsParametersAsUncompiled(): Observable<AppSectionsParametersForBE> {
    return this.#readURLForUncompiled().pipe(
      switchMap((url: string): Observable<AppSectionsParametersForBE> => {
        return this.#readSectionParametersAsUncompiledByURL(url)
      }),
    )
  }

  #readSectionParametersAsUncompiledByURL(url: string): Observable<AppSectionsParametersForBE> {
    return this.#httpClient.get<AppSectionsParametersForBE>(url)
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/app')
  }
}
