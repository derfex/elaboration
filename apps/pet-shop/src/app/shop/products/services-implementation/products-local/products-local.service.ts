// # External modules
import { Injectable } from '@angular/core'
import { type Observable, of } from 'rxjs'

// # Internal modules
import type { PSProductsService } from '../../../../integrator/ui/ps-products/products-service.type'
import type { ProductTableViewModel } from '../../shared/product-table-view.model'
import productsData from './products.data'

@Injectable({
  providedIn: 'root',
})
export class ProductsLocalService implements PSProductsService {
  private readonly observable: Observable<readonly ProductTableViewModel[]> = of(productsData)

  public getAll(): Observable<readonly ProductTableViewModel[]> {
    return this.observable
  }
}
