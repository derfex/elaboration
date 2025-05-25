import { Observable } from 'rxjs';
import { IProductTableViewModel } from '../shared/product-table-view.model';

// TODO: Rename the file to `products-service.types.ts`.

export type ObservableProducts = Observable<IProductTableViewModel[]>;

// TODO: Avoid `I` prefix.
export interface IProductsService {
  getAll(): ObservableProducts;
}
