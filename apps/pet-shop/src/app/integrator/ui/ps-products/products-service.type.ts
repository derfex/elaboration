import type { Observable } from 'rxjs'
import type { PSProductTableItem } from './ps-products.type'

export interface PSProductsServiceReadList {
  readList(): Observable<readonly PSProductTableItem[]>
}
