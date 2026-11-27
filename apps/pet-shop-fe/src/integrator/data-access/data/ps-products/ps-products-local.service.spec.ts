import { TestBed } from '@angular/core/testing'

import { PSProductsLocalService } from './ps-products-local.service'

describe('PSProductsLocalService', (): void => {
  beforeEach((): TestBed => TestBed.configureTestingModule({}))

  it('should be created', (): void => {
    const service: PSProductsLocalService = TestBed.inject(PSProductsLocalService)
    expect(service).toBeTruthy()
  })
})
