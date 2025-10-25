import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { DXActivitiesSectionMediatorService } from '~be/dx-activities/dx-activities-section-mediator.service'
import type { DXActivityCodename } from '~entities/dx-activity/dx-activity.type'
import type {
  DXActivitiesSectionParameters,
  DXActivitiesSectionParametersAndList,
} from '~ui/dx-activities/dx-activities-section/dx-activities-section.type'
import type { DXActivitiesListItem } from '~ui/dx-activities/dx-activities/dx-activities.type'
import { DXActivitiesSectionComponent } from './dx-activities-section.component'

describe('DXActivitiesSectionComponent', (): void => {
  let component: DXActivitiesSectionComponent
  let fixture: ComponentFixture<DXActivitiesSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        DXActivitiesStubComponent,
      ],
      providers: [
        { provide: DXActivitiesSectionMediatorService, useClass: DXActivitiesSectionMediatorStubService },
      ],
    })
      .compileComponents()

    fixture = TestBed.createComponent(DXActivitiesSectionComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('number', 0)
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-dx-activities', template: '' })
class DXActivitiesStubComponent {}

class DXActivitiesSectionMediatorStubService {
  public readSectionParametersAndList(): Observable<DXActivitiesSectionParametersAndList> {
    const sectionParameters: DXActivitiesSectionParameters = {
      descriptionText: 'No data',
      list: {
        emptyStateText: 'No data.',
        item: {
          skillsTitleText: 'No data',
        },
      },
      titleText: 'No data',
    }
    const dxActivities: readonly DXActivitiesListItem[] = [
      {
        codename: 'act-1' as DXActivityCodename,
        period: '2020-02 – 2020-02',
        results: ['result 1'],
        role: 'No data',
        shortDescription: 'short description 1',
        skills: ['CSS', 'Git'],
      },
      {
        codename: 'act-2' as DXActivityCodename,
        period: '2020-05 – 2020-08',
        results: ['result 4'],
        role: 'No data',
        shortDescription: 'short description 2',
        skills: ['Angular', 'CSS', 'Git'],
      },
    ]
    return of({ list: dxActivities, sectionParameters })
  }
}
