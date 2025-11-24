import { Injectable } from '@angular/core'
import { map, type Observable, of, shareReplay } from 'rxjs'
import type { AppSectionsParametersForBE } from '~be/app/app-sections-for-be.type'
import type { AppFooterSectionParameters } from '~ui/app-footer-section/app-footer-section.type'
import type { AppHeroSectionParameters } from '~ui/app-hero-section/app-hero-section.type'

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
    return this.#sectionsParameters$.pipe(map<AppSectionsParametersForBE, AppHeroSectionParameters>(({ hero }) => hero))
  }

  #readSectionsParametersAsUncompiled(): Observable<AppSectionsParametersForBE> {
    return of({
      footer: {
        appealText: 'No data.',
        copyrightText: 'No data',
        craftedWithText: 'No data',
      },
      hero: {
        appealText: 'No data.',
        authorsSignatureLines: [],
        eventDateCaptionText: 'No data',
        eventDateValueText: 'No data',
        titleText: 'No data',
      },
    })
  }
}
