// # External modules
import { inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

// # Internal modules
import type { PSProductCategory } from '../../../../../architecture/entities/ps-product-categories/ps-product-categories.type'
import { environment } from '../../../../../environments/environment'
import { BackendAPIService } from '../backend-api/backend-api.service'
import type { PSProductCategoryForBE } from './ps-categories-for-be.type'

@Injectable({
  providedIn: 'root',
})
export class PSCategoriesForBEService {
  readonly #backendAPIService = inject(BackendAPIService)

  public readList(): Observable<readonly PSProductCategory[]> {
    return this.#backendAPIService.get<readonly PSProductCategoryForBE[]>(environment.API.categories.readList)
  }
}
