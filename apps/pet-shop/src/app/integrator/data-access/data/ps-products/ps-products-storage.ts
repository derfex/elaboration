import type { PSProduct } from '../../../../../architecture/entities/ps-products/ps-products.type'

export class PSProductsStorage {
  #counter = 0
  readonly #items: PSProduct[] = []

  public create(data: Omit<PSProduct, 'id'>): void {
    const id = ++this.#counter
    this.#items.push({
      id,
      ...data,
    })
  }

  public readList(): readonly PSProduct[] {
    return this.#items
  }
}
