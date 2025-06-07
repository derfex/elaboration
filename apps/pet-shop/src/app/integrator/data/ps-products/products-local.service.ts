// # External modules
import { Injectable } from '@angular/core'
import { type Observable, of } from 'rxjs'

// # Internal modules
import type { PSProductsService } from '../../ui/ps-products/products-service.type'
import type { PSProductTableItem } from '../../ui/ps-products/ps-products.type'
import productsData from './products.data'

@Injectable({
  providedIn: 'root',
})
export class ProductsLocalService implements PSProductsService {
  private readonly observable: Observable<readonly PSProductTableItem[]> = of(productsData)

  public readList(): Observable<readonly PSProductTableItem[]> {
    return this.observable
  }
}
