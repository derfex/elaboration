// External modules.
import { Injectable } from '@angular/core'
import { BehaviorSubject, type Observable } from 'rxjs'

// Internal modules.
import { type ProductTableViewModel } from '../../products/shared/product-table-view.model'

// Definitions.
interface IItemsState {
  keys: Set<number>
  items: readonly ProductTableViewModel[]
}

const defaultState: IItemsState = {
  items: [],
  keys: new Set(),
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // region ## Properties
  private subject = new BehaviorSubject<IItemsState>(defaultState)

  public get state(): Observable<IItemsState> {
    return this.subject.asObservable()
  }

  // endregion ## Properties

  // region ## Methods
  public addProducts(products: readonly ProductTableViewModel[]): void {
    const value = this.subject.getValue()
    const items = value.items.concat(products)
    const keys = value.keys
    products.forEach((product: ProductTableViewModel): void => {
      keys.add(product.id)
    })
    this.subject.next({
      items,
      keys,
    })
  }

  public deleteProductByID(id: number): void {
    const value = this.subject.getValue()
    const items = value.items.filter((item) => item.id !== id)
    const keys = value.keys
    keys.delete(id)
    this.subject.next({
      items,
      keys,
    })
  }

  // endregion ## Methods
}
