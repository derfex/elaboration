import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EventDetailsSectionMediatorService } from '~be/event-details/event-details-section-mediator.service'
import type { EventDetailsSectionParameters } from '~ui/event-details/event-details-section/event-details-section.type'
import { EventDetailsComponent } from '~ui/event-details/event-details/event-details.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EventDetailsComponent],
  selector: 'app-event-details-section',
  styleUrl: './event-details-section.component.sass',
  templateUrl: './event-details-section.component.html',
})
export class EventDetailsSectionComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #eventDetailsSectionMediatorService = inject(EventDetailsSectionMediatorService)

  protected readonly sectionParameters = signal<EventDetailsSectionParameters>({
    descriptionParagraphs: [],
    titleText: 'No data',
    wishes: [],
  })

  public ngOnInit(): void {
    this.#readSectionParameters()
  }

  #readSectionParameters(): void {
    this.#eventDetailsSectionMediatorService
      .readSectionParameters()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((parameters: EventDetailsSectionParameters): void => {
        this.sectionParameters.set(parameters)
      })
  }
}
