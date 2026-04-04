import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import { DXActivitiesCompiledForBEService } from '~be/dx-activities/dx-activities-compiled-for-be.service'
import type { DXActivitiesCompiledSectionParametersForBE, DXActivityCompiledForBE } from '~be/dx-activities/dx-activities-compiled-for-be.type'
import { DXActivitiesForBEService } from '~be/dx-activities/dx-activities-for-be.service'
import type { DXActivityForBE } from '~be/dx-activities/dx-activities-for-be.type'
import { DXActivitySkillsForBEService } from '~be/dx-activities/dx-activity-skills-for-be.service'
import type { DXActivitySkillForBE } from '~be/dx-activities/dx-activity-skills-for-be.type'
import { LoadingNotifierService } from '~integrator/data-access/loading-notifier/loading-notifier.service'
import { LocaleSwitcherService } from '~integrator/data-access/locale/locale-switcher.service'
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
        { provide: DXActivitiesCompiledForBEService, useClass: DXActivitiesCompiledForBEStubService },
        { provide: DXActivitiesForBEService, useClass: DXActivitiesForBEStubService },
        { provide: DXActivitySkillsForBEService, useClass: DXActivitySkillsForBEStubService },
        { provide: LoadingNotifierService, useClass: LoadingNotifierStubService },
        { provide: LocaleSwitcherService, useClass: LocaleSwitcherStubService },
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
  public readURL(urlCodename: string): Observable<string> {
    return of(urlCodename)
  }
}

class DXActivitiesCompiledForBEStubService {
  public readList(): Observable<readonly DXActivityCompiledForBE[]> {
    const dxActivities: readonly DXActivityCompiledForBE[] = [
      {
        achievements: ['result 1'],
        codename: 'act-1',
        period: 'Test data, 2020-02',
        role: 'No data',
        shortDescription: 'short description 1',
        skills: ['CSS', 'Git'],
      },
      {
        achievements: ['result 4'],
        codename: 'act-2',
        period: 'Test data, 2020-08',
        role: 'No data',
        shortDescription: 'short description 2',
        skills: ['Angular', 'CSS', 'Git'],
      },
    ]
    return of(dxActivities)
  }

  public readSectionParameters(): Observable<DXActivitiesCompiledSectionParametersForBE> {
    return of({
      descriptionText: 'Test data.',
      list: {
        emptyStateText: 'Test data.',
        item: {
          achievementsTitleText: 'Test data',
          skillsTitleText: 'Test data',
        },
        sourceRelativeURL: 'TestData',
      },
      titleText: 'Test data',
    } satisfies DXActivitiesCompiledSectionParametersForBE)
  }
}

class DXActivitiesForBEStubService {
  public readList(): Observable<readonly DXActivityForBE[]> {
    const dxActivities: readonly DXActivityForBE[] = [
      {
        achievements: ['Test data.'],
        codename: 'act-1',
        periodFrom: '2020-02',
        periodTo: '2020-02',
        role: 'No data',
        shortDescription: 'short description 1',
        skillCodenames: ['CSS', 'Git'],
      },
      {
        achievements: ['Test data.'],
        codename: 'act-2',
        periodFrom: '2020-05',
        periodTo: '2020-08',
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

class LoadingNotifierStubService {}

class LocaleSwitcherStubService {}
