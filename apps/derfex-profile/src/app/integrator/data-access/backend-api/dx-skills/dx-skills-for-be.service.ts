import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'
import type { DXSkillForBE } from '~be/dx-skills/dx-skills-for-be.type'

@Injectable({
  providedIn: 'root',
})
export class DXSkillsForBEService {
  readonly #httpClient = inject(HttpClient)

  public readList(dxSkillsURL: string): Observable<readonly DXSkillForBE[]> {
    return this.#httpClient.get<readonly DXSkillForBE[]>(dxSkillsURL)
  }
}
