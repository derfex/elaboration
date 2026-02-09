import { Test, TestingModule } from '@nestjs/testing'
import { PSProductCategoriesService } from './ps-product-categories.service'

describe('PSProductCategoriesService', (): void => {
  let service: PSProductCategoriesService

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PSProductCategoriesService],
    }).compile()

    service = module.get<PSProductCategoriesService>(PSProductCategoriesService)
  })

  it('should be defined', (): void => {
    expect(service).toBeDefined()
  })
})
