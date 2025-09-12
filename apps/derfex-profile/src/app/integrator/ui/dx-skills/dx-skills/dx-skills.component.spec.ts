import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DXSkillsComponent } from './dx-skills.component'

describe('DXSkillsComponent', (): void => {
  let component: DXSkillsComponent
  let fixture: ComponentFixture<DXSkillsComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(DXSkillsComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    const mottoTextValue = 'No data.'
    const titleTextValue = 'No data'
    fixture.componentRef.setInput('mottoText', mottoTextValue)
    fixture.componentRef.setInput('titleText', titleTextValue)
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
