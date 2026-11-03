import { HttpClient } from '@angular/common/http'
import { inject, Service } from '@angular/core'
import type { Observable } from 'rxjs'
import type {
  DXActivitiesCompiledSectionParametersForBE,
  DXActivityCompiledForBE,
} from '~be/dx-activities/dx-activities-compiled-for-be.type'

@Service()
export class DXActivitiesCompiledForBEService {
  readonly #httpClient = inject(HttpClient)

  public readList(dxActivitiesCompiledURL: string): Observable<readonly DXActivityCompiledForBE[]> {
    return this.#httpClient.get<readonly DXActivityCompiledForBE[]>(dxActivitiesCompiledURL)
  }

  public readSectionParameters(
    dxActivitiesSectionCompiledURL: string,
  ): Observable<DXActivitiesCompiledSectionParametersForBE> {
    return this.#httpClient.get<DXActivitiesCompiledSectionParametersForBE>(dxActivitiesSectionCompiledURL)
  }
}
