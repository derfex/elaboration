import { Injectable } from '@angular/core'
import { map, type Observable, of } from 'rxjs'
import type { EventDetailsSectionParametersForBE } from '~be/event-details/event-details-section-for-be.type'
import type { EventDetailsSectionParameters } from '~ui/event-details/event-details-section/event-details-section.type'

@Injectable({
  providedIn: 'root',
})
export class EventDetailsSectionMediatorService {
  public readSectionParameters(): Observable<EventDetailsSectionParameters> {
    return this.#readSectionParametersAsUncompiled().pipe(
      map<EventDetailsSectionParametersForBE, EventDetailsSectionParameters>(
        ({ descriptionParagraphList: paragraphs, titleText }) => ({
          paragraphs,
          titleText,
        }),
      ),
    )
  }

  #readSectionParametersAsUncompiled(): Observable<EventDetailsSectionParametersForBE> {
    return of({
      descriptionParagraphList: [],
      titleText: 'No data',
    })
  }
}
