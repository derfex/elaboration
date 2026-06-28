import { TestBed } from '@angular/core/testing'
import { LayoutScrollService } from './layout-scroll.service'

describe('LayoutScrollService', (): void => {
  let service: LayoutScrollService

  beforeEach((): void => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LayoutScrollService)
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})
