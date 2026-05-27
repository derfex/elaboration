// # External modules
import { inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

// # Internal modules
import { BackendAPIService } from '~be/backend-api/backend-api.service'
import type { PSProductCategoryForBE } from '~be/ps-categories/ps-categories-for-be.type'
import type { PSProductCategory } from '~entities/ps-product-categories/ps-product-categories.type'
import { environment } from '~environments/environment.dev'

@Injectable({
  providedIn: 'root',
})
export class PSCategoriesForBEService {
  readonly #backendAPIService = inject(BackendAPIService)

  public readList(): Observable<readonly PSProductCategory[]> {
    return this.#backendAPIService.get<readonly PSProductCategoryForBE[]>(environment.API.categories.readList)
  }
}
