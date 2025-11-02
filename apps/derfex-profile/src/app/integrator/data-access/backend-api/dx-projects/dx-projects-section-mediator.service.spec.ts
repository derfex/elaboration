import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { BackendAPIConfigurationService } from '~be/backend-api-configuration/backend-api-configuration.service'
import { DXProjectsForBEService } from '~be/dx-projects/dx-projects-for-be.service'
import type { DXProjectForBE } from '~be/dx-projects/dx-projects-for-be.type'
import { DXProjectsSectionMediatorService } from './dx-projects-section-mediator.service'

describe('DXProjectsSectionMediatorService', (): void => {
  let httpTestingController: HttpTestingController
  let service: DXProjectsSectionMediatorService

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
        { provide: DXProjectsForBEService, useClass: DXProjectsForBEStubService },
      ],
    })
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(DXProjectsSectionMediatorService)
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

class DXProjectsForBEStubService {
  public readList(): Observable<readonly DXProjectForBE[]> {
    const dxProjects: readonly DXProjectForBE[] = [
      {
        codename: 'NoData1',
        name: 'No data',
        resultURL: 'no/data',
        sourceURL: 'no/data',
      },
      {
        codename: 'NoData2',
        name: 'No data',
        resultURL: 'no/data',
        sourceURL: 'no/data',
      },
    ]
    return of(dxProjects)
  }
}
