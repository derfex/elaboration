import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EventDetailsSectionMediatorService } from '~be/event-details/event-details-section-mediator.service'
import { LayoutArticleWithParagraphsComponent } from '~ui-kit/layout/layout-article-with-paragraphs/layout-article-with-paragraphs.component'
import type { EventDetailsSectionParameters } from '~ui/event-details/event-details-section/event-details-section.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LayoutArticleWithParagraphsComponent],
  selector: 'app-event-details-section',
  styleUrl: './event-details-section.component.sass',
  templateUrl: './event-details-section.component.html',
})
export class EventDetailsSectionComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #eventDetailsSectionMediatorService = inject(EventDetailsSectionMediatorService)

  protected readonly sectionParameters = signal<EventDetailsSectionParameters>({
    paragraphs: [],
    titleText: 'No data',
  })

  public ngOnInit(): void {
    this.#eventDetailsSectionMediatorService
      .readSectionParameters()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(({ paragraphs, titleText }: EventDetailsSectionParameters): void => {
        this.sectionParameters.set({
          paragraphs,
          titleText,
        })
      })
  }
}
