import { DOCUMENT, inject, Injectable, type Renderer2 } from '@angular/core'
import { MediaQueryService } from '~integrator/data-access/web-api/media-query/media-query.service'
import {
  appThemeColorSchemeDarkCSSClass,
  appThemeColorSchemeLightCSSClass,
} from '~ui-kit/theming/theming'

@Injectable({
  providedIn: 'root',
})
export class AppThemeSwitcherService {
  readonly #htmlElement = inject<Document>(DOCUMENT).documentElement as HTMLHtmlElement
  readonly #mediaQueryService = inject(MediaQueryService)

  #appThemeIsDark = true

  public observePrefersColorScheme(renderer: Renderer2): void {
    this.#observePrefersColorScheme(renderer)
  }

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

  #observePrefersColorScheme(renderer: Renderer2): void {
    console.log('debugger')
    const mediaQueryList = this.#mediaQueryService.matchMedia('(prefers-color-scheme: dark)')
    this.switchTheme(renderer, mediaQueryList.matches ? 'dark' : 'light')
    mediaQueryList.addEventListener('change', ({ matches: dark }): void => {
      this.switchTheme(renderer, dark ? 'dark' : 'light')
    })
  }
}

type AppTheme = 'dark' | 'light'
