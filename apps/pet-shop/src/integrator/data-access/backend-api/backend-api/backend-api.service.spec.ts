import { TestBed } from '@angular/core/testing'

import { BackendAPIService } from './backend-api.service'

describe('BackendAPIService', (): void => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', (): void => {
    const service: BackendAPIService = TestBed.inject(BackendAPIService)
    expect(service).toBeTruthy()
  })
})
