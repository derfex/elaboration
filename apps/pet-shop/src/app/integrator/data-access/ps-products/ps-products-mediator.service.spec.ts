import { TestBed } from '@angular/core/testing'
import { PSProductsMediatorService } from './ps-products-mediator.service'

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

describe('PSProductsMediatorService', (): void => {
  let service: PSProductsMediatorService

  beforeEach((): void => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(PSProductsMediatorService)
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})
