import type { PSProductCategory } from '../../../../architecture/entities/ps-product-categories/ps-product-categories.type'

export class PSProductCategoriesStorage {
  #counter = 0
  readonly #itemsMap = new Map<PSProductCategory['id'], PSProductCategory>()

  public create(data: Omit<PSProductCategory, 'id'>): void {
    const id = ++this.#counter
    this.#itemsMap.set(id, {
      id,
      ...data,
    })
  }

  public read(categoryID: PSProductCategory['id']): PSProductCategory | null {
    return this.#itemsMap.get(categoryID) ?? null
  }

  public readList(): readonly PSProductCategory[] {
    return [...this.#itemsMap].map(([, category]: [number, PSProductCategory]): PSProductCategory => category)
  }
}
