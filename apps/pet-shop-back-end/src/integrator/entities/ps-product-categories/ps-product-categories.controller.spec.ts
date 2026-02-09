import { Test, TestingModule } from '@nestjs/testing'
import { PSProductCategoriesController } from './ps-product-categories.controller'
import { PSProductCategoriesService } from './ps-product-categories.service'

describe('PSProductCategoriesController', (): void => {
  let controller: PSProductCategoriesController

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PSProductCategoriesController],
      providers: [PSProductCategoriesService],
    }).compile()

    controller = module.get<PSProductCategoriesController>(PSProductCategoriesController)
  })

  // FIXME.
  it('should be defined', (): void => {
    expect(controller).toBeDefined()
  })
})
