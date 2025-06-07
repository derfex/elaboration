// # External modules
import { inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

// # Internal modules
import { environment } from '../../../../environments/environment'
import { BackendAPIService } from '../../../integrator/backend-api/backend-api/backend-api.service'
import type { PSCategory } from '../../../integrator/backend-api/ps-categories/ps-categories-for-be.type'

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  readonly #backendAPIService = inject(BackendAPIService)

  public readList(): Observable<readonly PSCategory[]> {
    return this.#backendAPIService.get<readonly PSCategory[]>(environment.API.categories.readList)
  }
}
