import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderSectionComponent } from './header-section.component'
import { Component } from '@angular/core'
import { WINDOW } from '~integrator/data-access/web-api/window.token'
import { relax } from '~temp-libs/dev/relax.utility'

describe('HeaderSectionComponent', (): void => {
  let component: HeaderSectionComponent
  let fixture: ComponentFixture<HeaderSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        LayoutHeaderStubComponent,
      ],
      providers: [
        // Provided by the app.
        { provide: WINDOW, useValue: WINDOWStubToken },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(HeaderSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-layout-header', template: '' })
class LayoutHeaderStubComponent {}

const WINDOWStubToken = {
  matchMedia(/*query: string*/): MediaQueryList {
    return {
      addEventListener: relax,
      matches: true,
    } as unknown as MediaQueryList
  },
}
