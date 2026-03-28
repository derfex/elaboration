import { type ComponentFixture, TestBed } from '@angular/core/testing'
import type { DXActivityCodename } from '~entities/dx-activities/dx-activities.type'
import type { DXActivitiesListItem } from '~ui/dx-activities/dx-activities/dx-activities.type'
import { DXActivitiesComponent } from './dx-activities.component'

describe('DXActivitiesComponent', (): void => {
  let component: DXActivitiesComponent
  let fixture: ComponentFixture<DXActivitiesComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(DXActivitiesComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    const activity: DXActivitiesListItem = {
      achievements: ['Test data.'],
      codename: 'act-1' as DXActivityCodename,
      period: '2020-02 – 2020-02',
      role: 'Test data',
      shortDescription: 'Test data',
      skills: ['Test data', 'Test data'],
    }
    fixture.componentRef.setInput('activities', [activity])
    fixture.componentRef.setInput('activityAchievementsTitleText', 'Test data')
    fixture.componentRef.setInput('activitySkillsTitleText', 'Test data')
    fixture.componentRef.setInput('descriptionText', 'Test data.')
    fixture.componentRef.setInput('emptyStateText', 'Test data.')
    fixture.componentRef.setInput('titleText', 'Test data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
