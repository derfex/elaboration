// # External modules
import { Injectable } from '@angular/core'
import { type Observable, of } from 'rxjs'

// # Internal modules
import type { PSProduct } from '../../../../../architecture/entities/ps-products/ps-products.type'
import type { PSProductsServiceReadList } from '../../../ui/ps-products/products-service.type'
import { psProducts } from '../pet-shop.data'

@Injectable({
  providedIn: 'root',
})
export class PSProductsLocalService implements PSProductsServiceReadList {
  readonly #observable: Observable<readonly PSProduct[]> = of(psProducts)

  public readList(): Observable<readonly PSProduct[]> {
    return this.#observable
  }
}
