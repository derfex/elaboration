// # External modules
import { inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// # Internal modules
import { PSProductsHTTPService } from '~be/ps-products/ps-products-http.service'
import type { PSProduct } from '~entities/ps-products/ps-products.type'
import { PSProductsLocalService } from '~integrator/data-access/data/ps-products/ps-products-local.service'
import type { PSProductTableItem } from '~ui/ps-products/ps-products.type'

@Injectable({
  providedIn: 'root',
})
export class PSProductsMediatorService {
  // region ## Properties
  // region ### Injected
  readonly psProductsHTTPService = inject(PSProductsHTTPService)
  readonly psProductsLocalService = inject(PSProductsLocalService)
  // endregion ### Injected

  // TODO: Create a possibility to change `#preferHTTPService`.
  #preferHTTPService = true
  // endregion ## Properties

  // region ## Public API
  public readList(): Observable<readonly PSProductTableItem[]> {
    if (this.#preferHTTPService) {
      return this.#readListFromHTTPService()
    }
    return this.#readListFromLocalService()
  }
  // endregion ## Public API

  // region ## Methods
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
  // endregion ## Methods
}
