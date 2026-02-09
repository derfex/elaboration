import { Controller, Get } from '@nestjs/common'
import type { PSProductCategory } from '../../../architecture/entities/ps-product-categories/ps-product-categories.type'
import { PSProductCategoriesService } from './ps-product-categories.service'

@Controller('ps-product-categories')
export class PSProductCategoriesController {
  constructor(private readonly psProductCategoriesService: PSProductCategoriesService) {}

  @Get()
  public async readList(): Promise<readonly PSProductCategory[]> {
    return this.psProductCategoriesService.readList()
  }
}
