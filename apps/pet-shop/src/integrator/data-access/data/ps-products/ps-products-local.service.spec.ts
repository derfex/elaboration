import { TestBed } from '@angular/core/testing'
import { PSProductsLocalService } from './ps-products-local.service'

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

describe('PSProductsLocalService', (): void => {
  beforeEach((): TestBed => TestBed.configureTestingModule({}))

  it('should be created', (): void => {
    const service: PSProductsLocalService = TestBed.get(PSProductsLocalService)
    expect(service).toBeTruthy()
  })
})
