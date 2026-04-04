import { TestBed } from '@angular/core/testing'
import { MediaQueryService } from './media-query.service'

describe('MediaQueryService', (): void => {
  let service: MediaQueryService

  beforeEach((): void => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(MediaQueryService)
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})
