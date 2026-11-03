import { HttpClient } from '@angular/common/http'
import { inject, Service } from '@angular/core'
import type { Observable } from 'rxjs'
import type { DXSkillForBE } from '~be/dx-skills/dx-skills-for-be.type'

@Service()
export class DXSkillsForBEService {
  readonly #httpClient = inject(HttpClient)

  public readList(dxSkillsURL: string): Observable<readonly DXSkillForBE[]> {
    return this.#httpClient.get<readonly DXSkillForBE[]>(dxSkillsURL)
  }
}
