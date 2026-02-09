import { Module } from '@nestjs/common'
import { PSProductCategoriesModule } from '../integrator/entities/ps-product-categories/ps-product-categories.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  controllers: [AppController],
  imports: [PSProductCategoriesModule],
  providers: [AppService],
})
export class AppModule {}
