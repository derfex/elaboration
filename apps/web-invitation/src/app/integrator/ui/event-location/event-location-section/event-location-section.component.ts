import { ChangeDetectionStrategy, Component, type OnInit, signal } from '@angular/core'
import type { EventLocationSectionParameters } from '~ui/event-location/event-location-section/event-location-section.type'
import { GoogleMapComponent } from '~ui/event-location/google-map/google-map.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GoogleMapComponent],
  selector: 'app-event-location-section',
  styleUrl: './event-location-section.component.sass',
  templateUrl: './event-location-section.component.html',
})
export class EventLocationSectionComponent implements OnInit {
  protected readonly sectionParameters = signal<EventLocationSectionParameters>({
    locationURL: 'NoData',
    titleText: 'No data',
  })

  public ngOnInit(): void {
    this.sectionParameters.set({
      locationURL: 'NoData',
      titleText: 'No data',
    })
  }
}
