// External modules.
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// Internal modules.
import { APIService } from '../../../../shared/services/api.service';
import { IProductTableViewModel } from '../../shared/product-table-view.model';
import { IProductsService, ObservableProducts } from '../products-service';
import { environment } from './environment';

// Definitions.
function transformProduct(product: IProductTableViewModel): IProductTableViewModel {
  if (!product.parent) {
    product.parent = {
      id: null,
      name: '—',
    };
  }
  return product;
}


@Injectable({
  providedIn: 'root',
})
export class ProductsHTTPService implements IProductsService {
  readonly #backendAPIService = inject(APIService);

  public getAll(): ObservableProducts {
    return this.#backendAPIService
      .get<IProductTableViewModel[]>(environment.API.products.getAll)
      .pipe(map((products: IProductTableViewModel[]): IProductTableViewModel[] => products.map(transformProduct)));
  }
}
