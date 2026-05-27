// # External modules
import { Injectable } from '@angular/core'
import { type Observable, of } from 'rxjs'

// # Internal modules
import type { PSProduct } from '~entities/ps-products/ps-products.type'
import { psProducts } from '~integrator/data-access/data/pet-shop.data'
import type { PSProductsServiceReadList } from '~integrator/data-access/ps-products/products-service.type'

@Injectable({
  providedIn: 'root',
})
export class PSProductsLocalService implements PSProductsServiceReadList {
  readonly #observable: Observable<readonly PSProduct[]> = of(psProducts)

  public readList(): Observable<readonly PSProduct[]> {
    return this.#observable
  }
}
