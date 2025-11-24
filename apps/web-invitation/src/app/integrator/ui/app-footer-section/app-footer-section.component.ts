import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AppSectionsMediatorService } from '~be/app/app-sections-mediator.service'
import { LayoutFooterComponent } from '~ui-kit/layout/layout-footer/layout-footer.component'
import type { AppFooterSectionParameters } from '~ui/app-footer-section/app-footer-section.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LayoutFooterComponent],
  selector: 'app-footer-section',
  styleUrl: './app-footer-section.component.sass',
  templateUrl: './app-footer-section.component.html',
})
export class AppFooterSectionComponent implements OnInit {
  readonly #appSectionsMediatorService = inject(AppSectionsMediatorService)
  readonly #destroyRef = inject(DestroyRef)

  protected readonly sectionParameters = signal<AppFooterSectionParameters>({
    appealText: 'No data.',
    copyrightText: 'No data',
    craftedWithText: 'No data',
  })

  public ngOnInit(): void {
    this.#appSectionsMediatorService
      .readAppFooterSectionParameters()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((parameters: AppFooterSectionParameters): void => {
        this.sectionParameters.set(parameters)
      })
  }
}
