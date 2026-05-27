// # External modules
import { Injectable } from '@angular/core'
import { BehaviorSubject, type Observable } from 'rxjs'

// # Internal modules
import type { PSCartState } from '~ui/ps-cart/ps-cart.service.type'
import type { PSProductTableItem } from '~ui/ps-products/ps-products.type'

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
  public addProducts(products: readonly PSProductTableItem[]): void {
    const { items, keysSet } = this.#subject.getValue()
    const nextItems = items.concat(products)
    products.forEach((product: PSProductTableItem): void => {
      keysSet.add(product.id)
    })
    this.#subject.next({
      items: nextItems,
      keysSet,
    })
  }

  public deleteProductByID(id: number): void {
    const { items, keysSet } = this.#subject.getValue()
    const nextItems = items.filter((item: PSProductTableItem): boolean => item.id !== id)
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
