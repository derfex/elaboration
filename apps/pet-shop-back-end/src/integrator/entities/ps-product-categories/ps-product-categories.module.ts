import { Module } from '@nestjs/common'
import { PSProductCategoriesController } from './ps-product-categories.controller'

@Module({
  controllers: [PSProductCategoriesController],
})
export class PSProductCategoriesModule {}
