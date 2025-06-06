import { ProductTableViewModel } from '../../shared/product-table-view.model'

export class ProductsModel {
  #counter = 0
  readonly #items: ProductTableViewModel[] = []

  public addProduct(data: Omit<ProductTableViewModel, 'id'>): void {
    const id = ++this.#counter
    this.#items.push({
      id,
      ...data,
    })
  }

  public getAll(): readonly ProductTableViewModel[] {
    return this.#items
  }
}
