// # External modules
import { Injectable } from '@angular/core'
import { BehaviorSubject, type Observable } from 'rxjs'

// # Internal modules
import { type ProductTableViewModel } from '../../../shop/products/shared/product-table-view.model'

@Injectable({
  providedIn: 'root',
})
export class PSCartService {
  // region ## Properties
  readonly #subject = new BehaviorSubject<ItemsState>(defaultState)

  public get state(): Observable<ItemsState> {
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
interface ItemsState {
  readonly items: readonly ProductTableViewModel[]
  readonly keysSet: Set<number>
}

const defaultState: ItemsState = {
  items: [],
  keysSet: new Set(),
}
