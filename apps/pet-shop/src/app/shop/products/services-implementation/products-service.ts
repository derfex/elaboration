import { Observable } from 'rxjs'
import { ProductTableViewModel } from '../shared/product-table-view.model'

// TODO: Rename the file to `products-service.types.ts`.

export interface PSProductsService {
  getAll(): Observable<readonly ProductTableViewModel[]>
}
