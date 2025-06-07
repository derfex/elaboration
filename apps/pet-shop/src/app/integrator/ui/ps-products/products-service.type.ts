import type { Observable } from 'rxjs'
import type { ProductTableViewModel } from '../../../shop/products/shared/product-table-view.model'

export interface PSProductsService {
  getAll(): Observable<readonly ProductTableViewModel[]>
}
