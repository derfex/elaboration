import { TestBed } from '@angular/core/testing'
import { AppThemeSwitcherService } from '~ui-kit/theming/app-theme-switcher.service'

describe('UTThemeSwitcherService', (): void => {
  let service: AppThemeSwitcherService

  beforeEach((): void => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AppThemeSwitcherService)
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})
