import { Injectable } from '@angular/core'
import { type Observable, of } from 'rxjs'
import type { EventLocationSectionParametersForBE } from '~be/event-location/event-location-section-for-be.type'
import type { EventLocationSectionParameters } from '~ui/event-location/event-location-section/event-location-section.type'

@Injectable({
  providedIn: 'root',
})
export class EventLocationSectionMediatorService {
  public readSectionParameters(): Observable<EventLocationSectionParameters> {
    return this.#readSectionParametersAsUncompiled()
  }

  #readSectionParametersAsUncompiled(): Observable<EventLocationSectionParametersForBE> {
    return of({
      descriptionParagraphs: [],
      locationURL: 'NoData',
      titleText: 'No data',
      transferParagraphs: [],
    })
  }
}
