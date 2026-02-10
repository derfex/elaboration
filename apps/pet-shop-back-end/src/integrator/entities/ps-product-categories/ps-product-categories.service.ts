import { Injectable, type OnModuleInit } from '@nestjs/common'
import type { PSProductCategory } from '../../../architecture/entities/ps-product-categories/ps-product-categories.type'
import { psProductCategoriesRaw } from '../../data-access/ps-product-categories/ps-product-categories'
import { PSProductCategoriesStorage } from './ps-product-categories-storage'

@Injectable()
export class PSProductCategoriesService implements OnModuleInit {
  readonly #psProductCategoriesStorage = new PSProductCategoriesStorage()

  public onModuleInit(): void {
    psProductCategoriesRaw.forEach((psProductCategoryRaw): void => {
      this.#psProductCategoriesStorage.create(psProductCategoryRaw)
    })
  }

  public async readList(): Promise<readonly PSProductCategory[]> {
    return new Promise((resolve): void => {
      resolve(this.#psProductCategoriesStorage.readList())
    })
  }
}
