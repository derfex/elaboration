import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { DXProjectsSectionComponent } from './dx-projects-section.component'

describe('DXProjectsSectionComponent', (): void => {
  let component: DXProjectsSectionComponent
  let fixture: ComponentFixture<DXProjectsSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(DXProjectsSectionComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('number', 0)
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
