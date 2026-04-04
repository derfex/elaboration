import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { ArrowLeftIconComponent } from './arrow-left-icon.component'

describe('ButtonArrowIconComponent', (): void => {
  let component: ArrowLeftIconComponent
  let fixture: ComponentFixture<ArrowLeftIconComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(ArrowLeftIconComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
