import { Injectable } from '@angular/core'
import { type Observable, of } from 'rxjs'
import type { GuestQuestionnaireSectionParametersForBE } from '~be/guest-questionnaire/guest-questionnaire-section-for-be.type'
import type { GuestQuestionnaireSectionParameters } from '~ui/guest-questionnaire/guest-questionnaire-section/guest-questionnaire-section.type'

@Injectable({
  providedIn: 'root',
})
export class GuestQuestionnaireSectionMediatorService {
  public readSectionParameters(): Observable<GuestQuestionnaireSectionParameters> {
    return this.#readSectionParametersAsUncompiled()
  }

  #readSectionParametersAsUncompiled(): Observable<GuestQuestionnaireSectionParametersForBE> {
    return of({
      descriptionParagraphs: [],
      googleFormHeight: 0,
      googleFormURL: 'NoData',
      titleText: 'No data',
    })
  }
}
