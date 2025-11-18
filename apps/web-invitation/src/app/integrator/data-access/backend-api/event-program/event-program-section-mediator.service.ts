import { Injectable } from '@angular/core'
import { combineLatest, map, type Observable, of } from 'rxjs'
import type {
  EventProgramSectionParametersForBE,
  EventProgramStageForBE,
} from '~be/event-program/event-program-stages-for-be.type'
import type { EventProgramSectionParametersAndList } from '~ui/event-program/event-program-section/event-program-section.type'

@Injectable({
  providedIn: 'root',
})
export class EventProgramSectionMediatorService {
  public readSectionParametersAndList(): Observable<EventProgramSectionParametersAndList> {
    type CombineOutput = [readonly EventProgramStageForBE[], EventProgramSectionParametersForBE]

    return combineLatest([this.#readListAsUncompiled(), this.#readSectionParametersAsUncompiled()]).pipe(
      map<CombineOutput, EventProgramSectionParametersAndList>(([list, sectionParameters]) => {
        return {
          list,
          sectionParameters,
        }
      }),
    )
  }

  #readListAsUncompiled(): Observable<readonly EventProgramStageForBE[]> {
    return of([])
  }

  #readSectionParametersAsUncompiled(): Observable<EventProgramSectionParametersForBE> {
    return of({
      list: {
        emptyStateText: 'No data',
        sourceRelativeURL: 'NoData',
      },
      titleText: 'No data',
    })
  }
}
