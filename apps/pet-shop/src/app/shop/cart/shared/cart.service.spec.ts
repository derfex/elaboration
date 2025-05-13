import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', (): void => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', (): void => {
    const service: CartService = TestBed.get(CartService);
    expect(service).toBeTruthy();
  });
});
