import { DOCUMENT, inject, Injectable, type Renderer2 } from '@angular/core'
import { BehaviorSubject, distinctUntilChanged, type Observable } from 'rxjs'
import { MediaQueryService } from '~integrator/data-access/web-api/media-query/media-query.service'
import {
  appThemeColorSchemeDarkCSSClass,
  appThemeColorSchemeLightCSSClass,
} from '~ui-kit/theming/theming'
import type { ThemeColorSchemeCodename } from '~ui-kit/theming/theming.type'

@Injectable({
  providedIn: 'root',
})
export class AppThemeSwitcherService {
  readonly #htmlElementRef = inject<Document>(DOCUMENT).documentElement as HTMLHtmlElement
  readonly #mediaQueryService = inject(MediaQueryService)

  readonly #colorScheme = new BehaviorSubject<ThemeColorSchemeCodename>('normal')
  #colorSchemeIsDark = false

  public get colorScheme(): Observable<ThemeColorSchemeCodename> {
    return this.#colorScheme.asObservable().pipe(distinctUntilChanged())
  }

  public initColorScheme(renderer: Renderer2, colorScheme: ThemeColorSchemeCodename | null): void {
    if (colorScheme) {
      const darkColorSchemeIsNeeded = this.#checkIfDarkColorSchemeIsNeeded(colorScheme)
      this.#colorScheme.next(colorScheme)
      this.#updateThemeColorSchemeCSSClasses(renderer, darkColorSchemeIsNeeded)
    } else {
      // TODO?: Unsubscribe?
      this.#observePrefersColorScheme(renderer)
    }
  }

  public switchColorScheme(renderer: Renderer2, colorScheme: ThemeColorSchemeCodename): void {
    const darkColorSchemeIsNeeded = this.#checkIfDarkColorSchemeIsNeeded(colorScheme)
    this.#colorScheme.next(colorScheme)
    if (this.#colorSchemeIsDark === darkColorSchemeIsNeeded) return
    this.#updateThemeColorSchemeCSSClasses(renderer, darkColorSchemeIsNeeded)
  }

  #checkIfDarkColorSchemeIsNeeded(colorScheme: ThemeColorSchemeCodename): boolean {
    return colorScheme === 'dark'
      ? true
      : colorScheme === 'light'
        ? false
        : this.#getMediaQueryPrefersColorSchemeDark().matches
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
