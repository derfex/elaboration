import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EventDaySectionMediatorService } from '~be/event-day/event-day-section-mediator.service'
import { TextOrnamentComponent } from '~ui-kit/text-ornament/text-ornament.component'
import { TextOrnamentUtil } from '~ui-kit/text-ornament/text-ornament.util'
import type { EventDaySectionParameters } from '~ui/event-day/event-day-section/event-day-section.type'
import { EventDayComponent } from '~ui/event-day/event-day/event-day.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EventDayComponent, TextOrnamentComponent],
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
    ornament: {
      columnMinWidth: 0,
      count: 0,
      fontSize: 0,
      text: 'No data',
    },
    titleText: 'No data',
  })
  protected readonly textOrnamentComponentContainerStyle = computed<string>(() => {
    const { ornament: { columnMinWidth, fontSize } } = this.sectionParameters()
    const columnMinWidthStyle = `--app-text-ornament-component-column-min-width: ${columnMinWidth}px`
    const fontSizeStyle = `font-size: ${fontSize}px`
    return `${columnMinWidthStyle};${fontSizeStyle}`
  })
  protected readonly textOrnamentComponentTexts = computed<readonly string[]>(() => {
    const { ornament: { count, text } } = this.sectionParameters()
    return TextOrnamentUtil.generateTexts(text, count)
  })

  public ngOnInit(): void {
    this.#readSectionParameters()
  }

  #readSectionParameters(): void {
    this.#eventDaySectionMediatorService
      .readSectionParameters()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((parameters: EventDaySectionParameters): void => {
        this.sectionParameters.set(parameters)
      })
  }
}
