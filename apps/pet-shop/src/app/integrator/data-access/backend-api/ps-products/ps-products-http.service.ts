// # External modules
import { inject, Injectable } from '@angular/core'
import { type Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// # Internal modules
import type { PSProduct } from '../../../../../architecture/entities/ps-products/ps-products.type'
import { environment } from '../../../../../environments/environment'
import type { PSProductsServiceReadList } from '../../ps-products/products-service.type'
import { BackendAPIService } from '../backend-api/backend-api.service'
import type { PSProductForBE } from './ps-products-for-be.type'

@Injectable({
  providedIn: 'root',
})
export class PSProductsHTTPService implements PSProductsServiceReadList {
  readonly #backendAPIService = inject(BackendAPIService)

  public readList(): Observable<readonly PSProduct[]> {
    return this.#backendAPIService
      .get<readonly PSProductForBE[]>(environment.API.products.readList)
      .pipe(map((products: readonly PSProductForBE[]): readonly PSProduct[] => products.map(transformProduct)))
  }
}

// # Definitions
function transformProduct({ id, name, parent, price }: PSProductForBE): PSProduct {
  return {
    id,
    name,
    parent: {
      id: parent.id,
      name: parent.name,
    },
    price,
  }
}
