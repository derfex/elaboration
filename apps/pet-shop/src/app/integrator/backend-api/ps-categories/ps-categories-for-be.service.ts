// # External modules
import { inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

// # Internal modules
import { environment } from '../../../../environments/environment'
import { BackendAPIService } from '../backend-api/backend-api.service'
import type { PSCategory } from './ps-categories-for-be.type'

@Injectable({
  providedIn: 'root',
})
export class PSCategoriesForBEService {
  readonly #backendAPIService = inject(BackendAPIService)

  public readList(): Observable<readonly PSCategory[]> {
    return this.#backendAPIService.get<readonly PSCategory[]>(environment.API.categories.readList)
  }
}
