import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'
import type { DXActivityForBE } from '~be/dx-activities/dx-activities-for-be.type'

@Injectable({
  providedIn: 'root',
})
export class DXActivitiesForBEService {
  readonly #httpClient = inject(HttpClient)

  public readList(dxActivitiesURL: string): Observable<readonly DXActivityForBE[]> {
    return this.#httpClient.get<readonly DXActivityForBE[]>(dxActivitiesURL)
  }
}
