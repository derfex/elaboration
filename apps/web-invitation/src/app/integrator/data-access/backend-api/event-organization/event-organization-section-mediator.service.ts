import { Injectable } from '@angular/core'
import { type Observable, of } from 'rxjs'
import type { EventOrganizationSectionParametersForBE } from '~be/event-organization/event-organization-section-for-be.type'
import type { EventOrganizationSectionParameters } from '~ui/event-organization/event-organization-section/event-organization-section.type'

@Injectable({
  providedIn: 'root',
})
export class EventOrganizationSectionMediatorService {
  public readSectionParameters(): Observable<EventOrganizationSectionParameters> {
    return this.#readSectionParametersAsUncompiled()
  }

  #readSectionParametersAsUncompiled(): Observable<EventOrganizationSectionParametersForBE> {
    return of({
      contacts: [],
      descriptionParagraphs: [],
      titleText: 'No data',
    })
  }
}
