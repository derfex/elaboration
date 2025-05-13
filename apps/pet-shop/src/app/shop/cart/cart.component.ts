// External modules.
import { NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { Subscription } from 'rxjs';

// Internal modules.
import {
  IProductTableViewModel,
  ProductModels,
} from '../products/shared/product-table-view.model';
import { EmptinessComponent } from '../shared/components/emptiness/emptiness.component';
import { CartService } from './shared/cart.service';

@Component({
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    NgIf,

    EmptinessComponent,
  ],
  selector: 'app-cart',
  styleUrls: ['./cart.component.sass'],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
  // region ## Properties
  private itemsPrivate: ProductModels = [];
  protected dataSource: MatTableDataSource<IProductTableViewModel> =
    new MatTableDataSource<IProductTableViewModel>([]);
  protected displayedColumns: string[] = [
    'delete',
    'number',
    'name',
    'parent',
    'price',
  ];
  private subscriptionToCart: Subscription | undefined;

  @Input()
  set items(items: ProductModels) {
    this.itemsPrivate = items;
    this.dataSource = new MatTableDataSource<IProductTableViewModel>(items);
  }

  get items(): ProductModels {
    return this.itemsPrivate;
  }

  // endregion ## Properties

  constructor(private readonly cartService: CartService) {}

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    this.subscriptionToCart = this.cartService.state.subscribe((payload) => {
      this.items = payload.items;
    });
  }

  public ngOnDestroy(): void {
    // Unsubscribe to ensure no memory leaks.
    (this.subscriptionToCart as Subscription).unsubscribe();
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  protected hasDisplayedData(): boolean {
    return !!this.dataSource.filteredData.length;
  }

  protected deleteItem(id: number): void {
    this.cartService.deleteProductByID(id);
  }

  // endregion ## Methods
}
