import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { GuestQuestionnaireSectionMediatorService } from '~be/guest-questionnaire/guest-questionnaire-section-mediator.service'
import { GoogleFormComponent } from '~ui/guest-questionnaire/google-form/google-form.component'
import type { GuestQuestionnaireSectionParameters } from '~ui/guest-questionnaire/guest-questionnaire-section/guest-questionnaire-section.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GoogleFormComponent],
  selector: 'app-guest-questionnaire-section',
  styleUrl: './guest-questionnaire-section.component.sass',
  templateUrl: './guest-questionnaire-section.component.html',
})
export class GuestQuestionnaireSectionComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #guestQuestionnaireSectionMediatorService = inject(GuestQuestionnaireSectionMediatorService)

  protected readonly sectionParameters = signal<GuestQuestionnaireSectionParameters>({
    descriptionParagraphs: [],
    googleFormHeight: 0,
    googleFormURL: 'NoData',
    titleText: 'No data',
  })

  public ngOnInit(): void {
    this.sectionParameters.set({
      descriptionParagraphs: [],
      googleFormHeight: 0,
      googleFormURL: 'NoData',
      titleText: 'No data',
    })

    this.#guestQuestionnaireSectionMediatorService
      .readSectionParameters()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(
        ({
          descriptionParagraphs,
          googleFormHeight,
          googleFormURL,
          titleText,
        }: GuestQuestionnaireSectionParameters): void => {
          this.sectionParameters.set({
            descriptionParagraphs,
            googleFormHeight,
            googleFormURL,
            titleText,
          })
        },
      )
  }
}
