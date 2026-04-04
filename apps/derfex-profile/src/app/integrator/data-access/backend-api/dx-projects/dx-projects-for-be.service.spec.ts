import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { DXProjectsForBEService } from '~be/dx-projects/dx-projects-for-be.service'

describe('DXProjectsForBEService', (): void => {
  let httpTestingController: HttpTestingController
  let service: DXProjectsForBEService

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        // Note from `https://angular.dev/guide/http/testing`:
        // Keep in mind to provide `provideHttpClient()` before `provideHttpClientTesting()`,
        // as `provideHttpClientTesting()` will overwrite parts of provideHttpClient().
        // Doing it the other way around can potentially break your tests.
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(DXProjectsForBEService)
  })

  afterEach((): void => {
    // Verify that none of the tests make any extra HTTP requests.
    httpTestingController.verify()
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})
