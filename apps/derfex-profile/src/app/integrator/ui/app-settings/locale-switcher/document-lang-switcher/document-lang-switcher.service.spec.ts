import { TestBed } from '@angular/core/testing'
import { DocumentLangSwitcherService } from './document-lang-switcher.service'

describe('DocumentLangSwitcherService', (): void => {
  let service: DocumentLangSwitcherService

  beforeEach((): void => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DocumentLangSwitcherService)
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})
