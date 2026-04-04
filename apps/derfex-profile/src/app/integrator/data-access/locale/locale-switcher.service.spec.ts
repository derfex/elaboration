import { TestBed } from '@angular/core/testing'
import { LocaleSwitcherService } from './locale-switcher.service'

describe('LocaleSwitcherService', (): void => {
  let service: LocaleSwitcherService

  beforeEach((): void => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LocaleSwitcherService)
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})
