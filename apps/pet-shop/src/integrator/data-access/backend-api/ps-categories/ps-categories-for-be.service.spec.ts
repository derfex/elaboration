import { TestBed } from '@angular/core/testing'

import { PSCategoriesForBEService } from './ps-categories-for-be.service'

describe('PSCategoriesForBEService', (): void => {
  beforeEach((): TestBed => TestBed.configureTestingModule({}))

  it('should be created', (): void => {
    const service: PSCategoriesForBEService = TestBed.inject(PSCategoriesForBEService)
    expect(service).toBeTruthy()
  })
})
