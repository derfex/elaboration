import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit } from '@angular/core'
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop'
import { LoadingNotifierService } from '~integrator/data-access/loading-notifier/loading-notifier.service'
import { LocaleSwitcherService } from '~integrator/data-access/locale/locale-switcher.service'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'
import { LocalStorageService } from '~integrator/data-access/web-api/local-storage/local-storage.service'
import { LayoutLoaderComponent } from '~ui-kit/layout/layout-loader/layout-loader.component'
import { LayoutSectionSeparatorComponent } from '~ui-kit/layout/layout-section-separator/layout-section-separator.component'
import { DXActivitiesSectionComponent } from '~ui/dx-activities/dx-activities-section/dx-activities-section.component'
import { DXProjectsSectionComponent } from '~ui/dx-projects/dx-projects-section/dx-projects-section.component'
import { DXSkillsSectionComponent } from '~ui/dx-skills/dx-skills-section/dx-skills-section.component'
import { HeaderSectionComponent } from '~ui/header-section/header-section.component'
import { HeroSectionComponent } from '~ui/hero-section/hero-section.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    DXActivitiesSectionComponent,
    DXProjectsSectionComponent,
    DXSkillsSectionComponent,
    HeaderSectionComponent,
    HeroSectionComponent,
    LayoutLoaderComponent,
    LayoutSectionSeparatorComponent,
  ],
  selector: 'app-root-page',
  styleUrl: './root-page.component.sass',
  templateUrl: './root-page.component.html',
})
export class RootPageComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #loadingNotifierService = inject(LoadingNotifierService)
  readonly #localStorageService = inject(LocalStorageService)
  readonly #localeSwitcherService = inject(LocaleSwitcherService)

  protected loading = toSignal(this.#loadingNotifierService.loading, { initialValue: true })

  public ngOnInit(): void {
    const locale = this.#localStorageService.getItem<AppLocale>('locale')
    if (locale) {
      this.#localeSwitcherService.locale = locale
    }

    this.#localeSwitcherService.locale
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((locale: AppLocale): void => {
        this.#localStorageService.setItem('locale', locale)
      })
  }
}
