import { HttpClient } from '@angular/common/http'
import { inject, Service } from '@angular/core'
import type { Observable } from 'rxjs'
import type { DXProjectForBE } from '~be/dx-projects/dx-projects-for-be.type'

@Service()
export class DXProjectsForBEService {
  readonly #httpClient = inject(HttpClient)

  public readList(dxProjectsURL: string): Observable<readonly DXProjectForBE[]> {
    return this.#httpClient.get<readonly DXProjectForBE[]>(dxProjectsURL)
  }
}
