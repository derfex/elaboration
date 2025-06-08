import { inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import type { PSProduct } from '../../../../architecture/entities/ps-products/ps-products.type'
import type { PSProductTableItem } from '../../ui/ps-products/ps-products.type'
import { PSProductsHTTPService } from '../backend-api/ps-products/ps-products-http.service'
import { PSProductsLocalService } from '../data/ps-products/ps-products-local.service'

@Injectable({
  providedIn: 'root',
})
export class PSProductsMediatorService {
  // TODO: Create a possibility to change `#preferHTTPService`.
  #preferHTTPService = true
  readonly psProductsHTTPService = inject(PSProductsHTTPService)
  readonly psProductsLocalService = inject(PSProductsLocalService)

  public readList(): Observable<readonly PSProductTableItem[]> {
    if (this.#preferHTTPService) {
      return this.#readListFromHTTPService()
    }
    return this.#readListFromLocalService()
  }

  #convertProductToTableItem(product: PSProduct): PSProductTableItem {
    return product
  }

  #readListFromHTTPService(): Observable<readonly PSProductTableItem[]> {
    return this.psProductsHTTPService
      .readList()
      .pipe(
        map((products: readonly PSProduct[]): readonly PSProductTableItem[] =>
          products.map(this.#convertProductToTableItem),
        ),
      )
  }

  #readListFromLocalService(): Observable<readonly PSProductTableItem[]> {
    return this.psProductsLocalService
      .readList()
      .pipe(
        map((products: readonly PSProduct[]): readonly PSProductTableItem[] =>
          products.map(this.#convertProductToTableItem),
        ),
      )
  }
}
