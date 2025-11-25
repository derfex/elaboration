import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AppSectionsMediatorService } from '~be/app/app-sections-mediator.service'
import type { AppHeroSectionParameters } from '~ui/app-hero-section/app-hero-section/app-hero-section.type'
import { AppHeroComponent } from '~ui/app-hero-section/app-hero/app-hero.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppHeroComponent],
  selector: 'app-hero-section',
  styleUrl: './app-hero-section.component.sass',
  templateUrl: './app-hero-section.component.html',
})
export class AppHeroSectionComponent implements OnInit {
  readonly #appSectionsMediatorService = inject(AppSectionsMediatorService)
  readonly #destroyRef = inject(DestroyRef)

  protected readonly sectionParameters = signal<AppHeroSectionParameters>({
    illustrationImageAltText: 'No data',
    illustrationImageHeight: 0,
    illustrationImageURL: 'NoData',
    illustrationImageWidth: 0,
    phraseText: 'No data.',
  })

  public ngOnInit(): void {
    this.#appSectionsMediatorService
      .readAppHeroSectionParameters()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((parameters: AppHeroSectionParameters): void => {
        this.sectionParameters.set(parameters)
      })
  }
}
