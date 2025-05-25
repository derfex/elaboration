import { TestBed } from '@angular/core/testing';
import { ProductsHTTPService } from './products-http.service';

describe('ProductsHTTPService', (): void => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', (): void => {
    const service: ProductsHTTPService = TestBed.get(ProductsHTTPService);
    expect(service).toBeTruthy();
  });
});
