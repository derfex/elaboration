import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { ColorsPresentationComponent } from './colors-presentation.component'

describe('ColorsPresentationComponent', (): void => {
  let component: ColorsPresentationComponent
  let fixture: ComponentFixture<ColorsPresentationComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(ColorsPresentationComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
