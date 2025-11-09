import { inject, Injectable, type Renderer2 } from '@angular/core'
import { combineLatest, map, noop, type Observable } from 'rxjs'
import { LocaleSwitcherService } from '~integrator/data-access/locale/locale-switcher.service'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'
import { LocalStorageService } from '~integrator/data-access/web-api/local-storage/local-storage.service'
import { AppThemeSwitcherService } from '~ui-kit/theming/app-theme-switcher.service'
import type { ThemeColorSchemeCodename } from '~ui-kit/theming/theming.type'

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  readonly #appThemeSwitcherService = inject(AppThemeSwitcherService)
  readonly #localStorageService = inject(LocalStorageService)
  readonly #localeSwitcherService = inject(LocaleSwitcherService)

  public initAndObserve(renderer: Renderer2): Observable<void> {
    const locale = this.#initAndObserveLocale()
    const colorScheme = this.#initAndObserveThemeColorScheme(renderer)

    return combineLatest([locale, colorScheme]).pipe(map(noop))
  }

  #initAndObserveLocale(): Observable<void> {
    const locale = this.#localStorageService.getItem<AppLocale>('locale')
    if (locale) {
      this.#localeSwitcherService.locale = locale
    }

    return this.#localeSwitcherService.locale.pipe(
      map((locale: AppLocale): void => {
        this.#localStorageService.setItem('locale', locale)
      }),
    )
  }

  #initAndObserveThemeColorScheme(renderer: Renderer2): Observable<void> {
    const colorScheme = this.#localStorageService.getItem<ThemeColorSchemeCodename>('colorScheme')
    if (colorScheme) {
      this.#appThemeSwitcherService.switchColorScheme(renderer, colorScheme)
    }

    // TODO?: Unsubscribe?
    this.#appThemeSwitcherService.observePrefersColorScheme(renderer)

    return this.#appThemeSwitcherService.colorScheme.pipe(
      map((colorScheme: ThemeColorSchemeCodename): void => {
        this.#localStorageService.setItem('colorScheme', colorScheme)
      }),
    )
  }
}
