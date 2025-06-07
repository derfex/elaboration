import type { Observable } from 'rxjs'
import type { PSProductTableItem } from './ps-products.type'

export interface PSProductsService {
  readList(): Observable<readonly PSProductTableItem[]>
}
