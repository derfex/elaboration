// # External modules
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
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
} from '@angular/material/table'
import { type Subscription } from 'rxjs'

// # Internal modules
import { type ProductTableViewModel } from '../../../shop/products/shared/product-table-view.model'
import { EmptinessComponent } from '../../../shop/shared/components/emptiness/emptiness.component'
import { type PSCartService } from './ps-cart.service'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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

    // Provided by the app.
    EmptinessComponent,
  ],
  selector: 'app-ps-cart',
  standalone: true, // TODO: Can we delete `standalone: true` for Angular@19?
  styleUrl: './ps-cart.component.sass',
  templateUrl: './ps-cart.component.html',
})
export class PSCartComponent implements OnInit, OnDestroy {
  // region ## Properties
  protected dataSource: MatTableDataSource<ProductTableViewModel> = new MatTableDataSource<ProductTableViewModel>([])
  protected displayedColumns: string[] = ['delete', 'number', 'name', 'parent', 'price']
  private itemsPrivate: readonly ProductTableViewModel[] = []
  private subscriptionToCart: Subscription | undefined

  @Input()
  public set items(items: readonly ProductTableViewModel[]) {
    this.itemsPrivate = items
    this.dataSource = new MatTableDataSource<ProductTableViewModel>([...items])
  }

  public get items(): readonly ProductTableViewModel[] {
    return this.itemsPrivate
  }

  // endregion ## Properties

  constructor(private readonly cartService: PSCartService) {}

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    this.subscriptionToCart = this.cartService.state.subscribe((payload): void => {
      this.items = payload.items
    })
  }

  public ngOnDestroy(): void {
    // Unsubscribe to ensure no memory leaks.
    ;(this.subscriptionToCart as Subscription).unsubscribe()
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  protected hasDisplayedData(): boolean {
    return !!this.dataSource.filteredData.length
  }

  protected deleteItem(id: number): void {
    this.cartService.deleteProductByID(id)
  }

  // endregion ## Methods
}
