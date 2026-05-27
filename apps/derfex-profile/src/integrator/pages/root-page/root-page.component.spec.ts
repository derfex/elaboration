import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { LoadingNotifierService } from '~integrator/data-access/loading-notifier/loading-notifier.service'
import { WINDOW } from '~integrator/data-access/web-api/window.token'
import { relax } from '~temp-libs/dev/relax.utility'
import { RootPageComponent } from './root-page.component'

describe('RootPageComponent', (): void => {
  let component: RootPageComponent
  let fixture: ComponentFixture<RootPageComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        DXActivitiesSectionStubComponent,
        DXProjectsSectionStubComponent,
        DXSkillsSectionStubComponent,
        HeaderSectionStubComponent,
        HeroSectionStubComponent,
        LayoutLoaderStubComponent,
        LayoutSectionSeparatorStubComponent,
      ],
      // TODO: Do we need to provide something for `HttpClient`
      //  if the component-under-test and the stubs do not use `HttpClient`?
      providers: [
        // Note from `https://angular.dev/guide/http/testing`:
        // Keep in mind to provide `provideHttpClient()` before `provideHttpClientTesting()`,
        // as `provideHttpClientTesting()` will overwrite parts of provideHttpClient().
        // Doing it the other way around can potentially break your tests.
        provideHttpClient(),
        provideHttpClientTesting(),

        // Provided by the app.
        { provide: LoadingNotifierService, useClass: LoadingNotifierStubService },
        { provide: WINDOW, useValue: WINDOWStubToken },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RootPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-dx-activities-section', template: '' })
class DXActivitiesSectionStubComponent {}

@Component({ selector: 'app-dx-projects-section', template: '' })
class DXProjectsSectionStubComponent {}

@Component({ selector: 'app-dx-skills-section', template: '' })
class DXSkillsSectionStubComponent {}

@Component({ selector: 'app-header-section', template: '' })
class HeaderSectionStubComponent {}

@Component({ selector: 'app-hero-section', template: '' })
class HeroSectionStubComponent {}

@Component({ selector: 'app-layout-loader', template: '' })
class LayoutLoaderStubComponent {}

@Component({ selector: 'app-layout-section-separator', template: '' })
class LayoutSectionSeparatorStubComponent {}

// TODO: Reorganize the stubs. All methods should be used in the corresponding test group.
class LoadingNotifierStubService {
  public get loading(): Observable<boolean> {
    return of(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public setProcessLoading(processCodename: string, loading: boolean): void {}
}

const WINDOWStubToken = {
  matchMedia(/*query: string*/): MediaQueryList {
    return {
      addEventListener: relax,
      matches: true,
    } as unknown as MediaQueryList
  },
}
