import { TestBed } from '@angular/core/testing'
import { ProductsLocalService } from './products-local.service'

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

describe('ProductsLocalService', (): void => {
  beforeEach((): TestBed => TestBed.configureTestingModule({}))

  it('should be created', (): void => {
    const service: ProductsLocalService = TestBed.get(ProductsLocalService)
    expect(service).toBeTruthy()
  })
})
