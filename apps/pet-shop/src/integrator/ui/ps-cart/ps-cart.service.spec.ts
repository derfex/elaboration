import { TestBed } from '@angular/core/testing'

import { PSCartService } from './ps-cart.service'

describe('PSCartService', (): void => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', (): void => {
    const service: PSCartService = TestBed.inject(PSCartService)
    expect(service).toBeTruthy()
  })
})
