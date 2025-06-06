import { Observable } from 'rxjs'
import { ProductTableViewModel } from '../shared/product-table-view.model'

// TODO: Rename the file to `products-service.types.ts`.

export type ObservableProducts = Observable<readonly ProductTableViewModel[]>

// TODO: Avoid `I` prefix.
export interface IProductsService {
  getAll(): Observable<readonly ProductTableViewModel[]>
}
