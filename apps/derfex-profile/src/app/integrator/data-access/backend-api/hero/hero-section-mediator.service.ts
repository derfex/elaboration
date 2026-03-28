import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, type Observable, switchMap, tap } from 'rxjs'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import type { RootPageHeroParametersForBE } from '~be/hero/root-page-hero-for-be.type'
import { LoadingNotifierService } from '~integrator/data-access/loading-notifier/loading-notifier.service'
import type { HeroSectionParameters } from '~ui/root-page/hero/hero-section/hero-section.type'

@Injectable({
  providedIn: 'root',
})
export class HeroSectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #httpClient = inject(HttpClient)
  readonly #loadingNotifierService = inject(LoadingNotifierService)

  public readSectionParameters(): Observable<HeroSectionParameters> {
    return this.#readSectionParametersAsUncompiled().pipe(
      tap((): void => {
        this.#loadingNotifierService.setProcessLoading(createProcessCodename('sections/hero'), false)
      }),
    )
  }

  #prepareParameters({
    callToActionText,
    contactGitHubURL,
    contactGmailURL,
    contactTelegramText,
    contactTelegramURL,
    contactsText,
    nameText,
    titleXML,
  }: RootPageHeroParametersForBE): HeroSectionParameters {
    return {
      callToActionText,
      contactGitHubURL,
      contactGmailURL,
      contactTelegramText,
      contactTelegramURL,
      contactsText,
      nameText,
      titleXML,
    }
  }

  #readSectionParametersAsUncompiledByURL(heroSectionURL: string): Observable<HeroSectionParameters> {
    return this.#httpClient.get<RootPageHeroParametersForBE>(heroSectionURL)
  }

  #readSectionParametersAsUncompiled(): Observable<HeroSectionParameters> {
    return this.#readURLForUncompiled().pipe(
      switchMap((heroSectionURL: string): Observable<HeroSectionParameters> => {
        return this.#readSectionParametersAsUncompiledByURL(heroSectionURL)
      }),
      map(this.#prepareParameters.bind(this)),
    )
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/hero').pipe(
      tap((): void => {
        this.#loadingNotifierService.setProcessLoading(createProcessCodename('sections/hero'), true)
      }),
    )
  }
}

function createProcessCodename(string: string): string {
  return `HeroSectionMediatorService ${string}`
}
