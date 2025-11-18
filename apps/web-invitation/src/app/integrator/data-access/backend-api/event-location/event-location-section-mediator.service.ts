import { Injectable } from '@angular/core'
import { type Observable, of } from 'rxjs'
import type { EventLocationSectionParametersForBE } from '~be/event-location/event-location-section-for-be.type'

@Injectable({
  providedIn: 'root',
})
export class EventLocationSectionMediatorService {
  public readSectionParameters(): Observable<EventLocationSectionParametersForBE> {
    return this.#readSectionParametersAsUncompiled()
  }

  #readSectionParametersAsUncompiled(): Observable<EventLocationSectionParametersForBE> {
    return of({
      locationURL: 'NoData',
      titleText: 'No data',
    })
  }
}
