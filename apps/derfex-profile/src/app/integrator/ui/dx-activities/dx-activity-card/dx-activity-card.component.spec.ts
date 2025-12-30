import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { DXActivityCardComponent } from './dx-activity-card.component'

describe('DXActivityCardComponent', (): void => {
  let component: DXActivityCardComponent
  let fixture: ComponentFixture<DXActivityCardComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(DXActivityCardComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    // fixture.componentRef.setInput('achievements', ['Test data.'])
    // fixture.componentRef.setInput('achievementsTitleText', 'Test data')
    // fixture.componentRef.setInput('period', '2020-02 – 2020-02')
    // fixture.componentRef.setInput('role', 'Test data')
    // fixture.componentRef.setInput('shortDescription', 'Test data.')
    // fixture.componentRef.setInput('skills', ['Test data', 'Test data 42'])
    // fixture.componentRef.setInput('skillsTitleText', 'Test data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
