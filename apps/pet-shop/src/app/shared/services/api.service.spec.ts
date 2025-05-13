import { TestBed } from '@angular/core/testing';
import { APIService } from './api.service';

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

describe('APIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIService = TestBed.get(APIService);
    expect(service).toBeTruthy();
  });
});
