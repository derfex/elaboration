// External modules.
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

// Internal modules.
import {
  IProductsService,
  ObservableProducts,
} from '../products-service';
import productsData from './products.data';


@Injectable({
  providedIn: 'root',
})
export class ProductsLocalService implements IProductsService {
  private readonly observable: ObservableProducts = of(productsData);

  public getAll(): ObservableProducts {
    return this.observable;
  }
}
