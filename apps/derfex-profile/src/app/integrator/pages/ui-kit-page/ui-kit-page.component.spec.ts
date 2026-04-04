import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { LoadingNotifierService } from '~integrator/data-access/loading-notifier/loading-notifier.service'
import { UIKitPageComponent } from './ui-kit-page.component'

describe('UIKitPageComponent', (): void => {
  let component: UIKitPageComponent
  let fixture: ComponentFixture<UIKitPageComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        HeaderSectionStubComponent,
        HeroSectionStubComponent,
        LayoutLoaderStubComponent,
        LayoutSectionSeparatorStubComponent,
        UIKitSectionStubComponent,
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
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(UIKitPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-header-section', template: '' })
class HeaderSectionStubComponent {}

@Component({ selector: 'app-hero-section', template: '' })
class HeroSectionStubComponent {}

@Component({ selector: 'app-layout-loader', template: '' })
class LayoutLoaderStubComponent {}

@Component({ selector: 'app-layout-section-separator', template: '' })
class LayoutSectionSeparatorStubComponent {}

@Component({ selector: 'app-ui-kit-section', template: '' })
class UIKitSectionStubComponent {}

class LoadingNotifierStubService {
  public get loading(): Observable<boolean> {
    return of(false)
  }
}
