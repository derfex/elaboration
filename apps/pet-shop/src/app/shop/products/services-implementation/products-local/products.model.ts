import { IProductTableViewModel } from '../../shared/product-table-view.model';

export class ProductsModel {
  #counter = 0;
  readonly #items: IProductTableViewModel[] = [];

  public addProduct(data: Omit<IProductTableViewModel, 'id'>): void {
    const id = ++this.#counter;
    this.#items.push({
      id,
      ...data,
    });
  }

  public getAll(): readonly IProductTableViewModel[] {
    return this.#items;
  }
}
