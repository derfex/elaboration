import type { PSProductTableItem } from '../../../../integrator/ui/ps-products/ps-products.type'

export class ProductsModel {
  #counter = 0
  readonly #items: PSProductTableItem[] = []

  public create(data: Omit<PSProductTableItem, 'id'>): void {
    const id = ++this.#counter
    this.#items.push({
      id,
      ...data,
    })
  }

  public readList(): readonly PSProductTableItem[] {
    return this.#items
  }
}
