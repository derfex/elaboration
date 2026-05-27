// # External modules
import { inject, Injectable } from '@angular/core'
import { type Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// # Internal modules
import { BackendAPIService } from '~be/backend-api/backend-api.service'
import type { PSProductForBE } from '~be/ps-products/ps-products-for-be.type'
import type { PSProduct } from '~entities/ps-products/ps-products.type'
import type { PSProductsServiceReadList } from '~integrator/data-access/ps-products/products-service.type'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PSProductsHTTPService implements PSProductsServiceReadList {
  readonly #backendAPIService = inject(BackendAPIService)

  public readList(): Observable<readonly PSProduct[]> {
    return this.#backendAPIService
      .get<readonly PSProductForBE[]>(environment.API.products.readList)
      .pipe(map((products: readonly PSProductForBE[]): readonly PSProduct[] => products.map(convertProduct)))
  }
}

// # Definitions
function convertProduct({ id, name, parent, price }: PSProductForBE): PSProduct {
  return {
    category: {
      id: parent.id,
      name: parent.name,
    },
    id,
    name,
    price,
  }
}
