import { TestBed } from '@angular/core/testing';
import { ProductsLocalService } from './products-local.service';

describe('ProductsLocalService', (): void => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', (): void => {
    const service: ProductsLocalService = TestBed.get(ProductsLocalService);
    expect(service).toBeTruthy();
  });
});
