import type { PSProductCategory } from '../../../../architecture/entities/ps-product-categories/ps-product-categories.type'

export class PSProductCategoriesStorage {
  #counter = 0
  readonly #itemsByIDMap = new Map<PSProductCategory['id'], PSProductCategory>()
  readonly #itemsByNameMap = new Map<PSProductCategory['name'], PSProductCategory>()

  public create(data: Omit<PSProductCategory, 'id'>): void {
    const id = ++this.#counter
    const category = {
      id,
      ...data,
    }
    this.#itemsByIDMap.set(id, category)
    this.#itemsByNameMap.set(data.name, category)
  }

  public readByID(categoryID: PSProductCategory['id']): PSProductCategory | null {
    return this.#itemsByIDMap.get(categoryID) ?? null
  }

  public readByName(categoryID: PSProductCategory['id']): PSProductCategory | null {
    return this.#itemsByIDMap.get(categoryID) ?? null
  }

  public readList(): readonly PSProductCategory[] {
    return [...this.#itemsByIDMap].map(([, category]: [number, PSProductCategory]): PSProductCategory => category)
  }
}
