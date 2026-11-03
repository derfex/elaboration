import { HttpClient } from '@angular/common/http'
import { inject, Service } from '@angular/core'
import type { Observable } from 'rxjs'
import type { DXActivityForBE } from '~be/dx-activities/dx-activities-for-be.type'

@Service()
export class DXActivitiesForBEService {
  readonly #httpClient = inject(HttpClient)

  public readList(dxActivitiesURL: string): Observable<readonly DXActivityForBE[]> {
    return this.#httpClient.get<readonly DXActivityForBE[]>(dxActivitiesURL)
  }
}
