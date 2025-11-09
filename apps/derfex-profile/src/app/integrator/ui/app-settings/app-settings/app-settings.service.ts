import { inject, Injectable, type Renderer2 } from '@angular/core'
import { map, type Observable } from 'rxjs'
import { LocaleSwitcherService } from '~integrator/data-access/locale/locale-switcher.service'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'
import { LocalStorageService } from '~integrator/data-access/web-api/local-storage/local-storage.service'
import { AppThemeSwitcherService } from '~ui-kit/theming/app-theme-switcher.service'

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  readonly #appThemeSwitcherService = inject(AppThemeSwitcherService)
  readonly #localStorageService = inject(LocalStorageService)
  readonly #localeSwitcherService = inject(LocaleSwitcherService)

  public initAndObserve(renderer: Renderer2): Observable<void> {
    const locale = this.#initAndObserveLocale()

    // TODO?: Unsubscribe?
    this.#appThemeSwitcherService.observePrefersColorScheme(renderer)

    return locale
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
}
