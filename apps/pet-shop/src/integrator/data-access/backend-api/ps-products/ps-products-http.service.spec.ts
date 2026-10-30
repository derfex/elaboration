import { TestBed } from '@angular/core/testing'

import { PSProductsHTTPService } from './ps-products-http.service'

describe('PSProductsHTTPService', (): void => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', (): void => {
    const service: PSProductsHTTPService = TestBed.inject(PSProductsHTTPService)
    expect(service).toBeTruthy()
  })
})
