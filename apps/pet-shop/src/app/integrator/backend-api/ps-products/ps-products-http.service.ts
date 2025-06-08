// # External modules
import { inject, Injectable } from '@angular/core'
import { type Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// # Internal modules
import { environment } from '../../../../../environments/environment'
import { BackendAPIService } from '../../../../integrator/backend-api/backend-api/backend-api.service'
import type { PSProductsService } from '../../../../integrator/ui/ps-products/products-service.type'
import type { PSProductTableItem } from '../../../../integrator/ui/ps-products/ps-products.type'

// # Definitions
// TODO: Do we need the function?
function transformProduct(product: PSProductTableItem): PSProductTableItem {
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

  public readList(): Observable<readonly PSProductTableItem[]> {
    return this.#backendAPIService
      .get<readonly PSProductTableItem[]>(environment.API.products.readList)
      .pipe(
        map((products: readonly PSProductTableItem[]): readonly PSProductTableItem[] =>
          products.map(transformProduct),
        ),
      )
  }
}
