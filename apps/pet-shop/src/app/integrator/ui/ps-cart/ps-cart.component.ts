// # External modules
import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
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

// # Internal modules
import { type ProductTableViewModel } from '../../../shop/products/shared/product-table-view.model'
import { PSEmptinessComponent } from '../../ui-kit/ps-emptiness/ps-emptiness.component'
import { PSCartService } from './ps-cart.service'
import { type PSCartState } from './ps-cart.service.type'

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
    PSEmptinessComponent,
  ],
  selector: 'app-ps-cart',
  standalone: true, // TODO: Can we delete `standalone: true` for Angular@19?
  styleUrl: './ps-cart.component.sass',
  templateUrl: './ps-cart.component.html',
})
export class PSCartComponent implements OnInit {
  // region ## Properties
  @Input()
  public set items(items: readonly ProductTableViewModel[]) {
    this.#items = items
    this.dataSource = new MatTableDataSource<ProductTableViewModel>([...items])
  }

  public get items(): readonly ProductTableViewModel[] {
    return this.#items
  }

  protected dataSource: MatTableDataSource<ProductTableViewModel> = new MatTableDataSource<ProductTableViewModel>([])
  protected displayedColumns: string[] = ['delete', 'number', 'name', 'parent', 'price']

  readonly #destroyRef = inject(DestroyRef)
  #items: readonly ProductTableViewModel[] = []
  readonly #psCartService = inject(PSCartService)

  // endregion ## Properties

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    this.#fetchCartItems()
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  protected hasDisplayedData(): boolean {
    return !!this.dataSource.filteredData.length
  }

  protected deleteItem(id: number): void {
    this.#psCartService.deleteProductByID(id)
  }

  #fetchCartItems(): void {
    this.#psCartService.state.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(({ items }: PSCartState): void => {
      this.items = items
    })
  }

  // endregion ## Methods
}
