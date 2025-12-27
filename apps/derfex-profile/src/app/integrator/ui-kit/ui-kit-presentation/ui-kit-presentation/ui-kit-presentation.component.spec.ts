import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { UIKitPresentationComponent } from './ui-kit-presentation.component'

describe('UIKitPresentationComponent', (): void => {
  let component: UIKitPresentationComponent
  let fixture: ComponentFixture<UIKitPresentationComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(UIKitPresentationComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
