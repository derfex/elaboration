import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { DressCodeSectionMediatorService } from '~be/dress-code/dress-code-section-mediator.service'
import type { DressCodeSectionParameters } from '~ui/dress-code/dress-code-section/dress-code-section.type'
import { DressCodeComponent } from '~ui/dress-code/dress-code/dress-code.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DressCodeComponent],
  selector: 'app-dress-code-section',
  styleUrl: './dress-code-section.component.sass',
  templateUrl: './dress-code-section.component.html',
})
export class DressCodeSectionComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #dressCodeSectionMediatorService = inject(DressCodeSectionMediatorService)

  protected readonly sectionParameters = signal<DressCodeSectionParameters>({
    descriptionParagraphs: [],
    tints: [],
    titleText: 'No data',
  })

  public ngOnInit(): void {
    this.#dressCodeSectionMediatorService
      .readSectionParameters()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((parameters: DressCodeSectionParameters): void => {
        this.sectionParameters.set(parameters)
      })
  }
}
