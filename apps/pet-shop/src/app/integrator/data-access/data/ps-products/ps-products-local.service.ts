// # External modules
import { Injectable } from '@angular/core'
import { type Observable, of } from 'rxjs'

// # Internal modules
import type { PSProductsServiceReadList } from '../../ui/ps-products/products-service.type'
import type { PSProductTableItem } from '../../ui/ps-products/ps-products.type'
import { psProducts } from '../pet-shop.data'

@Injectable({
  providedIn: 'root',
})
export class PSProductsLocalService implements PSProductsServiceReadList {
  readonly #observable: Observable<readonly PSProductTableItem[]> = of(psProducts)

  public readList(): Observable<readonly PSProductTableItem[]> {
    return this.#observable
  }
}
