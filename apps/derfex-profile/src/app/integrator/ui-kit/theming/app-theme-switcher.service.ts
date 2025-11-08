import { DOCUMENT, inject, Injectable, type Renderer2 } from '@angular/core'
import {
  appThemeColorSchemeDarkCSSClass,
  appThemeColorSchemeLightCSSClass,
} from '~ui-kit/theming/theming'

@Injectable({
  providedIn: 'root',
})
export class AppThemeSwitcherService {
  readonly #htmlElement = inject<Document>(DOCUMENT).documentElement as HTMLHtmlElement

  #appThemeIsDark = true

  public switchTheme(renderer: Renderer2, theme: AppTheme): void {
    const darkThemeIsNeeded = theme === 'dark'
    if (this.#appThemeIsDark === darkThemeIsNeeded) return
    this.#appThemeIsDark = darkThemeIsNeeded
    if (darkThemeIsNeeded) {
      renderer.addClass(this.#htmlElement, appThemeColorSchemeDarkCSSClass)
      renderer.removeClass(this.#htmlElement, appThemeColorSchemeLightCSSClass)
    } else {
      renderer.removeClass(this.#htmlElement, appThemeColorSchemeDarkCSSClass)
      renderer.addClass(this.#htmlElement, appThemeColorSchemeLightCSSClass)
    }
  }

  public switchThemeToNext(renderer: Renderer2): void {
    this.switchTheme(renderer, this.#appThemeIsDark ? 'light' : 'dark')
  }
}

type AppTheme = 'dark' | 'light'
