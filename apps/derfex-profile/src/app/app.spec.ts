import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { App as AppComponent } from './app'

describe('AppComponent', (): void => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
