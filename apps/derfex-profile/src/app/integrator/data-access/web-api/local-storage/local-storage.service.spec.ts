import { TestBed } from '@angular/core/testing'
import { LocalStorageService } from './local-storage.service'

describe('LocalStorageService', (): void => {
  let service: LocalStorageService

  beforeEach((): void => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LocalStorageService)
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})
