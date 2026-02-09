import { Module } from '@nestjs/common'
import { PSProductCategoriesController } from './ps-product-categories.controller'
import { PSProductCategoriesService } from './ps-product-categories.service'

@Module({
  controllers: [PSProductCategoriesController],
  providers: [PSProductCategoriesService],
})
export class PSProductCategoriesModule {}
