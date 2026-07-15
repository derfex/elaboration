import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'

describe('AppComponent', (): void => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      // TODO: Do we need to import the component-under-test (`AppComponent`)?
      //  Does import cause a back-end API call in cases where stubs are created?
      imports: [AppComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
