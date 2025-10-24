import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import { DXActivitiesForBEService } from '~be/dx-activities/dx-activities-for-be.service'
import type { DXActivityForBE } from '~be/dx-activities/dx-activities-for-be.type'
import { DXActivitySkillsForBEService } from '~be/dx-activities/dx-activity-skills-for-be.service'
import type { DXActivitySkillForBE } from '~be/dx-activities/dx-activity-skills-for-be.type'
import { DXActivitiesSectionMediatorService } from './dx-activities-section-mediator.service'

describe('DXActivitiesSectionMediatorService', (): void => {
  let httpTestingController: HttpTestingController
  let service: DXActivitiesSectionMediatorService

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        // Note from `https://angular.dev/guide/http/testing`:
        // Keep in mind to provide `provideHttpClient()` before `provideHttpClientTesting()`,
        // as `provideHttpClientTesting()` will overwrite parts of provideHttpClient().
        // Doing it the other way around can potentially break your tests.
        provideHttpClient(),
        provideHttpClientTesting(),

        // Provided by the app.
        { provide: BackendAPIConfigurationService, useClass: BackendAPIConfigurationStubService },
        { provide: DXActivitiesForBEService, useClass: DXActivitiesForBEStubService },
        { provide: DXActivitySkillsForBEService, useClass: DXActivitySkillsForBEStubService },
      ],
    })
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(DXActivitiesSectionMediatorService)
  })

  afterEach((): void => {
    // Verify that none of the tests make any extra HTTP requests.
    httpTestingController.verify()
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})

class BackendAPIConfigurationStubService {
  // TODO: Do we need to specify `never` if we have not `throw` inside?
  public readURL(urlCodename: string): Observable<string> | never {
    return of(urlCodename)
  }
}

class DXActivitiesForBEStubService {
  public readList(): Observable<readonly DXActivityForBE[]> {
    const dxActivities: readonly DXActivityForBE[] = [
      {
        codename: 'act-1',
        periodFrom: '2020-02',
        periodTo: '2020-02',
        results: ['result 1'],
        role: 'No data',
        shortDescription: 'short description 1',
        skillCodenames: ['CSS', 'Git'],
      },
      {
        codename: 'act-2',
        periodFrom: '2020-05',
        periodTo: '2020-08',
        results: ['result 4'],
        role: 'No data',
        shortDescription: 'short description 2',
        skillCodenames: ['Angular', 'CSS', 'Git'],
      },
    ]
    return of(dxActivities)
  }
}

class DXActivitySkillsForBEStubService {
  public readList(): Observable<readonly DXActivitySkillForBE[]> {
    const dxActivitySkills: readonly DXActivitySkillForBE[] = [
      {
        codename: 'Angular',
        title: 'Angular',
      },
      {
        codename: 'CSS',
        title: 'CSS',
      },
    ]
    return of(dxActivitySkills)
  }
}
