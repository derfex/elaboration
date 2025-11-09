import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, Renderer2, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AppThemeSwitcherService } from '~ui-kit/theming/app-theme-switcher.service'
import type { ThemeColorSchemeCodename } from '~ui-kit/theming/theming.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-color-scheme-switcher',
  styleUrl: './color-scheme-switcher.component.sass',
  templateUrl: './color-scheme-switcher.component.html',
})
export class ColorSchemeSwitcherComponent implements OnInit {
  readonly #appThemeSwitcherService = inject(AppThemeSwitcherService)
  readonly #destroyRef = inject(DestroyRef)
  readonly #renderer = inject(Renderer2)

  readonly #colorSchemeListMap = this.#generateColorSchemeListMap()
  protected readonly colorSchemes = signal(this.#colorSchemeListMap.get('normal') as ColorSchemesForTemplate)

  public ngOnInit(): void {
    this.#appThemeSwitcherService.colorScheme
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((colorScheme: ThemeColorSchemeCodename): void => {
        this.colorSchemes.set(this.#colorSchemeListMap.get(colorScheme) as ColorSchemesForTemplate)
      })
  }

  protected buttonClickHandler(theme: ThemeColorSchemeCodename): void {
    this.#appThemeSwitcherService.switchColorScheme(this.#renderer, theme !== 'normal' ? theme : 'dark')
  }

  #generateColorSchemeForTemplateList([darkChecked, lightChecked, normalChecked]: readonly [
    boolean,
    boolean,
    boolean,
  ]): ColorSchemesForTemplate {
    return [
      {
        ariaChecked: darkChecked,
        codename: 'dark',
        disabled: darkChecked,
        label: 'Dark',
      },
      {
        ariaChecked: normalChecked,
        codename: 'normal',
        disabled: normalChecked,
        label: 'System',
      },
      {
        ariaChecked: lightChecked,
        codename: 'light',
        disabled: lightChecked,
        label: 'Light',
      },
    ]
  }

  #generateColorSchemeListMap(): ReadonlyMap<ThemeColorSchemeCodename, ColorSchemesForTemplate> {
    return new Map<ThemeColorSchemeCodename, ColorSchemesForTemplate>([
      ['dark', this.#generateColorSchemeForTemplateList([true, false, false])],
      ['light', this.#generateColorSchemeForTemplateList([false, true, false])],
      ['normal', this.#generateColorSchemeForTemplateList([false, false, true])],
    ])
  }
}

interface ColorSchemeForTemplate {
  readonly ariaChecked: boolean
  readonly codename: ThemeColorSchemeCodename
  readonly disabled: boolean
  readonly label: string
}
type ColorSchemesForTemplate = readonly ColorSchemeForTemplate[]
