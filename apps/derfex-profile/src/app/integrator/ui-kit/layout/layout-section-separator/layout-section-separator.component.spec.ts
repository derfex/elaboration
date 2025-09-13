import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutSectionSeparatorComponent } from './layout-section-separator.component'

describe('LayoutSectionSeparatorComponent', (): void => {
  let component: LayoutSectionSeparatorComponent
  let fixture: ComponentFixture<LayoutSectionSeparatorComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(LayoutSectionSeparatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
