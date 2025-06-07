import type { Observable } from 'rxjs'
import type { ProductTableViewModel } from './ps-products.type'

export interface PSProductsService {
  readList(): Observable<readonly ProductTableViewModel[]>
}
