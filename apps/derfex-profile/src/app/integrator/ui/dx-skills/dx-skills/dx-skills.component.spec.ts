import { type ComponentFixture, TestBed } from '@angular/core/testing'
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
    expect(component).toBeTruthy()
  })
})
