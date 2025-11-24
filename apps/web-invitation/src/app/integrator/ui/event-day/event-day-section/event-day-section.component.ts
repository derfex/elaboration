import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EventDaySectionMediatorService } from '~be/event-day/event-day-section-mediator.service'
import type { EventDaySectionParameters } from '~ui/event-day/event-day-section/event-day-section.type'
import { EventDayComponent } from '~ui/event-day/event-day/event-day.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EventDayComponent],
  selector: 'app-event-day-section',
  styleUrl: './event-day-section.component.sass',
  templateUrl: './event-day-section.component.html',
})
export class EventDaySectionComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #eventDaySectionMediatorService = inject(EventDaySectionMediatorService)

  protected readonly sectionParameters = signal<EventDaySectionParameters>({
    appealText: 'No data.',
    authorsSignatureLines: [],
    eventDateCaptionText: 'No data',
    eventDateValueText: 'No data',
    titleText: 'No data',
  })

  public ngOnInit(): void {
    this.#eventDaySectionMediatorService
      .readSectionParameters()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((parameters: EventDaySectionParameters): void => {
        this.sectionParameters.set(parameters)
      })
  }
}
