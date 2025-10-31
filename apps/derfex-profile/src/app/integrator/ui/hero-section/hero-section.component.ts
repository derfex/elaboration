import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { HeroSectionMediatorService } from '~be/hero/hero-section-mediator.service'
import { LayoutHeroComponent } from '~ui-kit/layout/layout-hero/layout-hero.component'
import type { HeroSectionParameters } from '~ui/hero-section/hero-section.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LayoutHeroComponent],
  selector: 'app-hero-section',
  styleUrl: './hero-section.component.sass',
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #heroSectionMediatorService = inject(HeroSectionMediatorService)

  protected readonly codename = 'HERO'
  protected readonly sectionParameters = signal<HeroSectionParameters>({
    contactGitHubURL: 'No data',
    contactTelegramURL: 'No data',
    nameText: 'No data',
    titleXML: '<highlight>No data</highlight>',
  })

  public ngOnInit(): void {
    this.#heroSectionMediatorService
      .readSectionParameters()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(({ contactGitHubURL, contactTelegramURL, nameText, titleXML }: HeroSectionParameters): void => {
        this.sectionParameters.set({
          contactGitHubURL,
          contactTelegramURL,
          nameText,
          titleXML,
        })
      })
  }
}
