// # External modules
import { inject, Injectable } from '@angular/core'
import { type Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// # Internal modules
import { environment } from '../../../../../environments/environment'
import { BackendAPIService } from '../../../../integrator/backend-api/backend-api/backend-api.service'
import type { PSProductsService } from '../../../../integrator/ui/ps-products/products-service.type'
import { ProductTableViewModel } from '../../shared/product-table-view.model'

// # Definitions
// TODO: Do we need the function?
function transformProduct(product: ProductTableViewModel): ProductTableViewModel {
  if (!product.parent) {
    ;(product as any).parent = {
      id: null,
      name: '—',
    }
  }
  return product
}

@Injectable({
  providedIn: 'root',
})
export class ProductsHTTPService implements PSProductsService {
  readonly #backendAPIService = inject(BackendAPIService)

  public readList(): Observable<readonly ProductTableViewModel[]> {
    return this.#backendAPIService
      .get<readonly ProductTableViewModel[]>(environment.API.products.getAll)
      .pipe(
        map((products: readonly ProductTableViewModel[]): readonly ProductTableViewModel[] =>
          products.map(transformProduct),
        ),
      )
  }
}
