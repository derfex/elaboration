import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'
import type {
  DXActivitiesCompiledSectionParametersForBE,
  DXActivityCompiledForBE,
} from '~be/dx-activities/dx-activities-compiled-for-be.type'

@Injectable({
  providedIn: 'root',
})
export class DXActivitiesCompiledForBEService {
  readonly #httpClient = inject(HttpClient)

  public readList(dxActivitiesCompiledURL: string): Observable<readonly DXActivityCompiledForBE[]> {
    return this.#httpClient.get<readonly DXActivityCompiledForBE[]>(dxActivitiesCompiledURL)
  }

  public readSectionParameters(dxActivitiesSectionCompiledURL: string): Observable<DXActivitiesCompiledSectionParametersForBE> {
    return this.#httpClient.get<DXActivitiesCompiledSectionParametersForBE>(dxActivitiesSectionCompiledURL)
  }
}
