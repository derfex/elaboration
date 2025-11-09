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

  #colorSchemeIsDark = false

  public observePrefersColorScheme(renderer: Renderer2): void {
    this.#observePrefersColorScheme(renderer)
  }

  public switchColorScheme(renderer: Renderer2, theme: ColorSchemeCodename): void {
    const darkColorSchemeIsNeeded =
      theme === 'dark' ? true : theme === 'normal' ? this.#getMediaQueryPrefersColorSchemeDark().matches : false
    if (this.#colorSchemeIsDark === darkColorSchemeIsNeeded) return
    this.#updateThemeColorSchemeCSSClasses(renderer, darkColorSchemeIsNeeded)
  }

  #getMediaQueryPrefersColorSchemeDark(): MediaQueryList {
    return this.#mediaQueryService.matchMedia('(prefers-color-scheme: dark)')
  }

  #observePrefersColorScheme(renderer: Renderer2): void {
    const mediaQueryList = this.#getMediaQueryPrefersColorSchemeDark()
    this.#updateThemeColorSchemeCSSClasses(renderer, mediaQueryList.matches)
    mediaQueryList.addEventListener('change', ({ matches: dark }: MediaQueryListEvent): void => {
      this.switchColorScheme(renderer, dark ? 'dark' : 'light')
    })
  }

  #updateThemeColorSchemeCSSClasses(renderer: Renderer2, darkColorSchemeIsNeeded: boolean): void {
    if (darkColorSchemeIsNeeded) {
      renderer.addClass(this.#htmlElementRef, appThemeColorSchemeDarkCSSClass)
      renderer.removeClass(this.#htmlElementRef, appThemeColorSchemeLightCSSClass)
    } else {
      renderer.removeClass(this.#htmlElementRef, appThemeColorSchemeDarkCSSClass)
      renderer.addClass(this.#htmlElementRef, appThemeColorSchemeLightCSSClass)
    }
    this.#colorSchemeIsDark = darkColorSchemeIsNeeded
  }
}

type ColorSchemeCodename = 'dark' | 'light' | 'normal'
