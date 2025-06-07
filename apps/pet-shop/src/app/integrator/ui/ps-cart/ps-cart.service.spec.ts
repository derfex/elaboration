import { TestBed } from '@angular/core/testing'
import { PSCartService } from './ps-cart.service'

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

describe('PSCartService', (): void => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', (): void => {
    const service: PSCartService = TestBed.get(PSCartService)
    expect(service).toBeTruthy()
  })
})
