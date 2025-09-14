import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DXSkillCardComponent } from './dx-skill-card.component'

describe('DxSkillCardComponent', (): void => {
  let component: DXSkillCardComponent
  let fixture: ComponentFixture<DXSkillCardComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(DXSkillCardComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
