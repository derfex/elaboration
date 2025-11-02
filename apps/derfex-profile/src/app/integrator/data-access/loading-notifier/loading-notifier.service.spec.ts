import { TestBed } from '@angular/core/testing'
import { LoadingNotifierService } from './loading-notifier.service'

describe('LoadingNotifierService', (): void => {
  let service: LoadingNotifierService

  beforeEach((): void => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LoadingNotifierService)
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})
