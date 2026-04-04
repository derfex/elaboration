import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderSectionComponent } from './header-section.component'

describe('HeaderSectionComponent', (): void => {
  let component: HeaderSectionComponent
  let fixture: ComponentFixture<HeaderSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(HeaderSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
