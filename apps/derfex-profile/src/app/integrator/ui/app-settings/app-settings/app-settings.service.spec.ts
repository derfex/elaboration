import { TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { LocaleSwitcherService } from '~integrator/data-access/locale/locale-switcher.service'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'
import { LocalStorageService } from '~integrator/data-access/web-api/local-storage/local-storage.service'
import { AppThemeSwitcherService } from '~ui-kit/theming/app-theme-switcher.service'
import { AppSettingsService } from './app-settings.service'

describe('AppSettingsService', (): void => {
  let service: AppSettingsService

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AppThemeSwitcherService, useClass: AppThemeSwitcherStubService },
        { provide: LocalStorageService, useClass: LocalStorageStubService },
        { provide: LocaleSwitcherService, useClass: LocaleSwitcherStubService },
      ],
    })
    service = TestBed.inject(AppSettingsService)
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})

class AppThemeSwitcherStubService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public observePrefersColorScheme(): void {}
}

class LocalStorageStubService {
  public getItem(): null {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public setItem(): void {}
}

class LocaleSwitcherStubService {
  public get locale(): Observable<AppLocale> {
    return of('EN')
  }
}
