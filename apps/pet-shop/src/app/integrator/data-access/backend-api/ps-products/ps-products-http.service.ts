// # External modules
import { inject, Injectable } from '@angular/core'
import { type Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// # Internal modules
import { environment } from '../../../../../environments/environment'
import type { PSProductsServiceReadList } from '../../../ui/ps-products/products-service.type'
import type { PSProductTableItem } from '../../../ui/ps-products/ps-products.type'
import { BackendAPIService } from '../backend-api/backend-api.service'

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
export class PSProductsHTTPService implements PSProductsServiceReadList {
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
