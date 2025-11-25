import { Injectable } from '@angular/core'
import { map, type Observable, of, shareReplay } from 'rxjs'
import type { AppSectionsParametersForBE } from '~be/app/app-sections-for-be.type'
import { prepareWebInvitationDataCDNURL } from '~be/backend-api-configuration/backend-api-configuration'
import type { AppFooterSectionParameters } from '~ui/app-footer-section/app-footer-section/app-footer-section.type'
import type { AppHeroSectionParameters } from '~ui/app-hero-section/app-hero-section/app-hero-section.type'

@Injectable({
  providedIn: 'root',
})
export class AppSectionsMediatorService {
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
    return of({
      footer: {
        appealText: 'No data.',
        copyrightText: 'No data',
        craftedWithText: 'No data',
      },
      hero: {
        illustrationImageAltText: 'No data',
        illustrationImageHeight: 0,
        illustrationImageRelativeURL: 'NoData',
        illustrationImageWidth: 0,
        phraseText: 'No data.',
      },
    })
  }
}
