import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import { DXSkillsForBEService } from '~be/dx-skills/dx-skills-for-be.service'
import type { DXSkillForBE } from '~be/dx-skills/dx-skills-for-be.type'
import { DXSkillsSectionMediatorService } from './dx-skills-section-mediator.service'

describe('DXSkillsSectionMediatorService', (): void => {
  let httpTestingController: HttpTestingController
  let service: DXSkillsSectionMediatorService

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
        { provide: DXSkillsForBEService, useClass: DXSkillsForBEStubService },
      ],
    })
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(DXSkillsSectionMediatorService)
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

class DXSkillsForBEStubService {
  public readList(): Observable<readonly DXSkillForBE[]> {
    const dxSkills: readonly DXSkillForBE[] = [
      {
        codename: 'NoData1',
        name: 'No data',
        url: 'No data',
      },
      {
        codename: 'NoData2',
        name: 'No data',
        url: 'No data',
      },
    ]
    return of(dxSkills)
  }
}
