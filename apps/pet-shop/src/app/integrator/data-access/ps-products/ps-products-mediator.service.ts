import { inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import type { PSProduct } from '../../../../architecture/entities/ps-products/ps-products.type'
import type { PSProductTableItem } from '../../ui/ps-products/ps-products.type'
import { PSProductsHTTPService } from '../backend-api/ps-products/ps-products-http.service'

@Injectable({
  providedIn: 'root',
})
export class PSProductsMediatorService {
  readonly psProductsHTTPService = inject(PSProductsHTTPService)

  public readList(): Observable<readonly PSProductTableItem[]> {
    return this.#readListFromHTTPService()
  }

  #convertProductFromHTTPServiceToTableItem(product: PSProduct): PSProductTableItem {
    return product
  }

  #readListFromHTTPService(): Observable<readonly PSProductTableItem[]> {
    return this.psProductsHTTPService
      .readList()
      .pipe(
        map((products: readonly PSProduct[]): readonly PSProductTableItem[] =>
          products.map(this.#convertProductFromHTTPServiceToTableItem),
        ),
      )
  }
}
