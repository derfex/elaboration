import type { ProductTableViewModel } from '../../../shop/products/shared/product-table-view.model'

export interface PSCartState {
  readonly items: readonly ProductTableViewModel[]
  readonly keysSet: Set<number>
}
