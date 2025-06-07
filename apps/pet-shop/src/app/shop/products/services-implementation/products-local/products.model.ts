import type { ProductTableViewModel } from '../../../../integrator/ui/ps-products/ps-products.type'

export class ProductsModel {
  #counter = 0
  readonly #items: ProductTableViewModel[] = []

  public create(data: Omit<ProductTableViewModel, 'id'>): void {
    const id = ++this.#counter
    this.#items.push({
      id,
      ...data,
    })
  }

  public readList(): readonly ProductTableViewModel[] {
    return this.#items
  }
}
