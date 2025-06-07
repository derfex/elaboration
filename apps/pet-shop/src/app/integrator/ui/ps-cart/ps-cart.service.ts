// # External modules
import { Injectable } from '@angular/core'
import { BehaviorSubject, type Observable } from 'rxjs'

// # Internal modules
import type { ProductTableViewModel } from '../ps-products/ps-products.type'
import type { PSCartState } from './ps-cart.service.type'

@Injectable({
  providedIn: 'root',
})
export class PSCartService {
  // region ## Properties
  readonly #subject = new BehaviorSubject<PSCartState>(defaultState)

  public get state(): Observable<PSCartState> {
    return this.#subject.asObservable()
  }

  // endregion ## Properties

  // region ## Methods
  public addProducts(products: readonly ProductTableViewModel[]): void {
    const { items, keysSet } = this.#subject.getValue()
    const nextItems = items.concat(products)
    products.forEach((product: ProductTableViewModel): void => {
      keysSet.add(product.id)
    })
    this.#subject.next({
      items: nextItems,
      keysSet,
    })
  }

  public deleteProductByID(id: number): void {
    const { items, keysSet } = this.#subject.getValue()
    const nextItems = items.filter((item: ProductTableViewModel): boolean => item.id !== id)
    keysSet.delete(id)
    this.#subject.next({
      items: nextItems,
      keysSet,
    })
  }

  // endregion ## Methods
}

// # Definitions
const defaultState: PSCartState = {
  items: [],
  keysSet: new Set(),
}
