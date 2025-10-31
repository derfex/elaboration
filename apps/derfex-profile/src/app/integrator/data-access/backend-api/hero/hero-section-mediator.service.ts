import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { type Observable, switchMap } from 'rxjs'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import type { HeroSectionParameters } from '~ui/hero-section/hero-section.type'

@Injectable({
  providedIn: 'root',
})
export class HeroSectionMediatorService {
  readonly #backendAPIConfigurationService = inject(BackendAPIConfigurationService)
  readonly #httpClient = inject(HttpClient)

  public readSectionParameters(): Observable<HeroSectionParameters> {
    return this.#readSectionParametersAsUncompiled()
  }

  #readSectionParametersAsUncompiledByURL(heroSectionURL: string): Observable<HeroSectionParameters> {
    return this.#httpClient.get<HeroSectionParameters>(heroSectionURL)
  }

  #readSectionParametersAsUncompiled(): Observable<HeroSectionParameters> {
    return this.#readURLForUncompiled().pipe(
      switchMap((heroSectionURL: string): Observable<HeroSectionParameters> => {
        return this.#readSectionParametersAsUncompiledByURL(heroSectionURL)
      }),
    )
  }

  #readURLForUncompiled(): Observable<string> {
    return this.#backendAPIConfigurationService.readURL('sections/hero')
  }
}
