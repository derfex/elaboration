import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { LocaleSwitcherService } from '~integrator/data-access/locale/locale-switcher.service'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-locale-switcher',
  styleUrl: './locale-switcher.component.sass',
  templateUrl: './locale-switcher.component.html',
})
export class LocaleSwitcherComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #localeSwitcherService = inject(LocaleSwitcherService)

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
  }

  #generateLocaleForTemplateList([enDisabled, ruDisabled]: readonly [boolean, boolean]): LocalesForTemplate {
    return [
      {
        codename: 'EN',
        disabled: enDisabled,
        label: 'En',
      },
      {
        codename: 'RU',
        disabled: ruDisabled,
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
  readonly codename: AppLocale
  readonly disabled: boolean
  readonly label: string
}
type LocalesForTemplate = readonly LocaleForTemplate[]
