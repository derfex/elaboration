import type { PSProductTableItem } from '../ps-products/ps-products.type'

export interface PSCartState {
  readonly items: readonly PSProductTableItem[]
  readonly keysSet: Set<number>
}
