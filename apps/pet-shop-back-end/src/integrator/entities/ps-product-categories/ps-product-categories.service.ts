import { Injectable } from '@nestjs/common'
import type { PSProductCategory } from '../../../architecture/entities/ps-product-categories/ps-product-categories.type'

// TODO: implement.
@Injectable()
export class PSProductCategoriesService {
  public async readList(): Promise<readonly PSProductCategory[]> {
    return new Promise((resolve, reject) => {
      resolve([])
    })
  }
}
