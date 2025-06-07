// # External modules
import { Injectable } from '@angular/core'
import { type Observable, of } from 'rxjs'

// # Internal modules
import type { ProductTableViewModel } from '../../shared/product-table-view.model'
import type { PSProductsService } from '../products-service'
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
