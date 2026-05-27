import { TestBed } from '@angular/core/testing'
import { MediaQueryService } from '~integrator/data-access/web-api/media-query/media-query.service'
import { relax } from '~temp-libs/dev/relax.utility'
import { AppThemeSwitcherService } from './app-theme-switcher.service'

describe('UTThemeSwitcherService', (): void => {
  let service: AppThemeSwitcherService

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        // Provided by the app.
        { provide: MediaQueryService, useClass: MediaQueryStubService },
      ],
    })
    service = TestBed.inject(AppThemeSwitcherService)
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})

class MediaQueryStubService {
  public matchMedia(/*query: string*/): MediaQueryList {
    return {
      addEventListener: relax,
      matches: true,
    } as unknown as MediaQueryList
  }
}
