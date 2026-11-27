// # External modules
import type { Observable } from 'rxjs'

// # Internal modules
import type { PSProduct } from '~entities/ps-products/ps-products.type'

export interface PSProductsServiceReadList {
  readList(): Observable<readonly PSProduct[]>
}
