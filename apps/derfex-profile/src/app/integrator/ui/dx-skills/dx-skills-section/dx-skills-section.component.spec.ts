import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DXSkillsSectionComponent } from './dx-skills-section.component'

describe('DXSkillsSectionComponent', (): void => {
  let component: DXSkillsSectionComponent
  let fixture: ComponentFixture<DXSkillsSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(DXSkillsSectionComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('number', 0)
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
