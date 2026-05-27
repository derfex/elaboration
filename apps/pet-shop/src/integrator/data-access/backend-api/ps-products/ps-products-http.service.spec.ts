import { TestBed } from '@angular/core/testing'
import { PSProductsHTTPService } from './ps-products-http.service'

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

describe('PSProductsHTTPService', (): void => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', (): void => {
    const service: PSProductsHTTPService = TestBed.get(PSProductsHTTPService)
    expect(service).toBeTruthy()
  })
})
