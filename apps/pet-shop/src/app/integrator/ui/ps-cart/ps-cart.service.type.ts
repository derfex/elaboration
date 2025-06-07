import type { ProductTableViewModel } from '../ps-products/ps-products.type'

export interface PSCartState {
  readonly items: readonly ProductTableViewModel[]
  readonly keysSet: Set<number>
}
