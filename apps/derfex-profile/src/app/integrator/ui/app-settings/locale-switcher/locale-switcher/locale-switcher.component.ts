import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, Renderer2, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { LocaleSwitcherService } from '~integrator/data-access/locale/locale-switcher.service'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'
import { DocumentLangSwitcherService } from '~ui/app-settings/locale-switcher/document-lang-switcher/document-lang-switcher.service'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-locale-switcher',
  styleUrl: './locale-switcher.component.sass',
  templateUrl: './locale-switcher.component.html',
})
export class LocaleSwitcherComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #documentLangSwitcherService = inject(DocumentLangSwitcherService)
  readonly #localeSwitcherService = inject(LocaleSwitcherService)
  readonly #renderer = inject(Renderer2)

  readonly #localeListMap = this.#generateLocaleListMap()
  protected readonly locales = signal(this.#localeListMap.get('EN') as LocalesForTemplate)

  public ngOnInit(): void {
    this.#localeSwitcherService.locale
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((locale: AppLocale): void => {
        this.locales.set(this.#localeListMap.get(locale) as LocalesForTemplate)
      })
  }

  protected buttonClickHandler(locale: AppLocale): void {
    this.#localeSwitcherService.locale = locale
    this.#documentLangSwitcherService.switchLang(this.#renderer, locale)
  }

  #generateLocaleForTemplateList([enChecked, ruChecked]: readonly [boolean, boolean]): LocalesForTemplate {
    return [
      {
        ariaChecked: enChecked,
        codename: 'EN',
        disabled: enChecked,
        label: 'En',
      },
      {
        ariaChecked: ruChecked,
        codename: 'RU',
        disabled: ruChecked,
        label: 'Ru',
      },
    ]
  }

  #generateLocaleListMap(): ReadonlyMap<AppLocale, LocalesForTemplate> {
    return new Map<AppLocale, LocalesForTemplate>([
      ['EN', this.#generateLocaleForTemplateList([true, false])],
      ['RU', this.#generateLocaleForTemplateList([false, true])],
    ])
  }
}

interface LocaleForTemplate {
  readonly ariaChecked: boolean
  readonly codename: AppLocale
  readonly disabled: boolean
  readonly label: string
}
type LocalesForTemplate = readonly LocaleForTemplate[]
