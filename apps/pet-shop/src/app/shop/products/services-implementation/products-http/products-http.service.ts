// External modules.
import { inject, Injectable } from '@angular/core'
import { type Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// Internal modules.
import { environment } from '../../../../../environments/environment'
import { APIService } from '../../../../shared/services/api.service'
import { ProductTableViewModel } from '../../shared/product-table-view.model'
import { IProductsService } from '../products-service'

// # Definitions
// TODO: Do we need the function?
function transformProduct(product: ProductTableViewModel): ProductTableViewModel {
  if (!product.parent) {
    (product as any).parent = {
      id: null,
      name: '—',
    }
  }
  return product
}

@Injectable({
  providedIn: 'root',
})
export class ProductsHTTPService implements IProductsService {
  readonly #backendAPIService = inject(APIService)

  public getAll(): Observable<readonly ProductTableViewModel[]> {
    return this.#backendAPIService
      .get<readonly ProductTableViewModel[]>(environment.API.products.getAll)
      .pipe(map((products: readonly ProductTableViewModel[]): readonly ProductTableViewModel[] => products.map(transformProduct)))
  }
}
