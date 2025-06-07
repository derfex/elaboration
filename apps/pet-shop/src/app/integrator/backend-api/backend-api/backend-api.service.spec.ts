import { TestBed } from '@angular/core/testing'
import { BackendAPIService } from './backend-api.service'

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

describe('BackendAPIService', (): void => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', (): void => {
    const service: BackendAPIService = TestBed.get(BackendAPIService)
    expect(service).toBeTruthy()
  })
})
