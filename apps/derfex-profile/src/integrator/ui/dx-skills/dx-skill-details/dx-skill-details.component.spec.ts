import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { DXSkillDetailsComponent } from './dx-skill-details.component'

describe('DXSkillDetailsComponent', (): void => {
  let component: DXSkillDetailsComponent
  let fixture: ComponentFixture<DXSkillDetailsComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [DXSkillDetailsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DXSkillDetailsComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('detailsURL', 'TestData')
    fixture.componentRef.setInput('detailsURLText', 'Test data')
    fixture.componentRef.setInput('name', 'Test data')
    fixture.whenStable().then((): void => {
      expect(component).toBeTruthy()
    })
  })
})
