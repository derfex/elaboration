import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EventLocationSectionMediatorService } from '~be/event-location/event-location-section-mediator.service'
import { TextOrnamentComponent } from '~ui-kit/text-ornament/text-ornament.component'
import type { EventLocationSectionParameters } from '~ui/event-location/event-location-section/event-location-section.type'
import { GoogleMapComponent } from '~ui/event-location/google-map/google-map.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,

    // Provided by the app.
    GoogleMapComponent,
    TextOrnamentComponent,
  ],
  selector: 'app-event-location-section',
  styleUrl: './event-location-section.component.sass',
  templateUrl: './event-location-section.component.html',
})
export class EventLocationSectionComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #eventLocationSectionMediatorService = inject(EventLocationSectionMediatorService)

  protected readonly illustrationIsShown = signal<boolean>(false)
  protected readonly sectionParameters = signal<EventLocationSectionParameters>({
    descriptionParagraphs: [],
    illustrationCaptionText: 'No data',
    illustrationImageAltText: 'No data',
    illustrationImageHeight: 0,
    illustrationImageURL: 'NoData',
    illustrationImageWidth: 0,
    locationURL: 'NoData',
    ornament: {
      columnMinWidth: 0,
      count: 0,
      fontSize: 0,
      text: 'No data',
    },
    titleText: 'No data',
    transferParagraphs: [],
  })
  protected readonly textOrnamentComponentContainerStyle = computed<string>(() => {
    const { ornament: { columnMinWidth, fontSize } } = this.sectionParameters()
    const columnMinWidthStyle = `--app-text-ornament-component-column-min-width: ${columnMinWidth}px`
    const fontSizeStyle = `font-size: ${fontSize}px`
    return `${columnMinWidthStyle};${fontSizeStyle}`
  })
  protected readonly textOrnamentComponentTexts = computed<readonly string[]>(() => {
    const { ornament: { count, text } } = this.sectionParameters()
    return Array(count).fill(text)
  })

  public ngOnInit(): void {
    this.#eventLocationSectionMediatorService
      .readSectionParameters()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((parameters: EventLocationSectionParameters): void => {
        this.sectionParameters.set(parameters)
        this.illustrationIsShown.set(true)
      })
  }
}
