import { TestBed } from '@angular/core/testing'
import { PSCategoriesForBEService } from './ps-categories-for-be.service'

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

describe('PSCategoriesForBEService', (): void => {
  beforeEach((): TestBed => TestBed.configureTestingModule({}))

  it('should be created', (): void => {
    const service: PSCategoriesForBEService = TestBed.get(PSCategoriesForBEService)
    expect(service).toBeTruthy()
  })
})
