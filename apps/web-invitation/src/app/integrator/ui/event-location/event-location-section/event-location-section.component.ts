import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EventLocationSectionMediatorService } from '~be/event-location/event-location-section-mediator.service'
import type { EventLocationSectionParameters } from '~ui/event-location/event-location-section/event-location-section.type'
import { GoogleMapComponent } from '~ui/event-location/google-map/google-map.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,

    // Provided by the app.
    GoogleMapComponent,
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
    illustrationImageAltText: 'No data',
    illustrationImageHeight: 0,
    illustrationImageURL: 'NoData',
    illustrationImageWidth: 0,
    locationURL: 'NoData',
    titleText: 'No data',
    transferParagraphs: [],
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
