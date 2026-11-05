import { HttpClient } from '@angular/common/http'
import { inject, Service } from '@angular/core'
import type { Observable } from 'rxjs'
import type { DXActivitySkillForBE } from '~be/dx-activities/dx-activity-skills-for-be.type'

@Service()
export class DXActivitySkillsForBEService {
  readonly #httpClient = inject(HttpClient)

  public readList(dxActivitySkillsURL: string): Observable<readonly DXActivitySkillForBE[]> {
    return this.#httpClient.get<readonly DXActivitySkillForBE[]>(dxActivitySkillsURL)
  }
}
