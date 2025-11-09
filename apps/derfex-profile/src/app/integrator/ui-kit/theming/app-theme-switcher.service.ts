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
  readonly #htmlElementRef = inject<Document>(DOCUMENT).documentElement as HTMLHtmlElement
  readonly #mediaQueryService = inject(MediaQueryService)

  #appThemeIsDark = false

  public observePrefersColorScheme(renderer: Renderer2): void {
    this.#observePrefersColorScheme(renderer)
  }

  public switchTheme(renderer: Renderer2, theme: AppTheme): void {
    const darkThemeIsNeeded = theme === 'dark'
    if (this.#appThemeIsDark === darkThemeIsNeeded) return
    this.#updateThemeColorSchemeCSSClasses(renderer, darkThemeIsNeeded)
  }

  #observePrefersColorScheme(renderer: Renderer2): void {
    const mediaQueryList = this.#mediaQueryService.matchMedia('(prefers-color-scheme: dark)')
    this.#updateThemeColorSchemeCSSClasses(renderer, mediaQueryList.matches)
    mediaQueryList.addEventListener('change', ({ matches: dark }: MediaQueryListEvent): void => {
      this.switchTheme(renderer, dark ? 'dark' : 'light')
    })
  }

  #updateThemeColorSchemeCSSClasses(renderer: Renderer2, darkThemeIsNeeded: boolean): void {
    if (darkThemeIsNeeded) {
      renderer.addClass(this.#htmlElementRef, appThemeColorSchemeDarkCSSClass)
      renderer.removeClass(this.#htmlElementRef, appThemeColorSchemeLightCSSClass)
    } else {
      renderer.removeClass(this.#htmlElementRef, appThemeColorSchemeDarkCSSClass)
      renderer.addClass(this.#htmlElementRef, appThemeColorSchemeLightCSSClass)
    }
    this.#appThemeIsDark = darkThemeIsNeeded
  }
}

type AppTheme = 'dark' | 'light'
