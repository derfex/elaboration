import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { HeroSectionMediatorService } from '~be/hero/hero-section-mediator.service'
import { LayoutHeroComponent } from '~ui-kit/layout/layout-hero/layout-hero.component'
import type { HeroSectionParameters } from '~ui/root-page/hero/hero-section/hero-section.type'
import { RootPageHeroComponent } from '~ui/root-page/hero/root-page-hero/root-page-hero.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LayoutHeroComponent, RootPageHeroComponent],
  selector: 'app-hero-section',
  styleUrl: './hero-section.component.sass',
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #heroSectionMediatorService = inject(HeroSectionMediatorService)

  protected readonly codename = 'HERO'
  protected readonly sectionParameters = signal<HeroSectionParameters>({
    callToActionText: 'No data',
    contactGitHubURL: 'No data',
    contactGmailURL: 'No data',
    contactTelegramText: 'No data',
    contactTelegramURL: 'No data',
    contactsText: 'No data',
    nameText: 'No data',
    titleXML: '<highlight>No data</highlight>',
  })

  public ngOnInit(): void {
    this.#heroSectionMediatorService
      .readSectionParameters()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((parameters: HeroSectionParameters): void => {
        this.sectionParameters.set(parameters)
      })
  }
}
