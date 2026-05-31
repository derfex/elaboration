// # External modules
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
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
import { PSEmptinessComponent } from '~ui-kit/ps-emptiness/ps-emptiness.component'
import { PSCartService } from '~ui/ps-cart/ps-cart.service'
import type { PSProductTableItem } from '~ui/ps-products/ps-products.type'

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
  styleUrl: './ps-cart.component.sass',
  templateUrl: './ps-cart.component.html',
})
export class PSCartComponent {
  // region ## Properties
  // region ### Injected
  readonly #psCartService = inject(PSCartService)
  // endregion ### Injected

  public readonly items = input.required<readonly PSProductTableItem[]>()
  protected readonly dataSource = computed<MatTableDataSource<PSProductTableItem>>(
    // TODO: Do we need to clone objects within `items()`?
    () => new MatTableDataSource<PSProductTableItem>([...this.items()]),
  )
  protected readonly deleteItemButtonTitle = 'Delete item'
  protected readonly psEmptinessText = 'Add products to the cart'
  protected readonly tableDisplayedColumns: TableDisplayedColumns = ['action', 'number', 'name', 'category', 'price']
  protected readonly tableIsShown = computed<boolean>(() => !!this.dataSource().filteredData.length)
  // endregion ## Properties

  // region ## Methods
  protected deleteItemButtonClickHandler(id: number): void {
    this.#psCartService.deleteProductByID(id)
  }
  // endregion ## Methods
}

type TableDisplayedColumn = 'action' | 'category' | 'name' | 'number' | 'price'
type TableDisplayedColumns = readonly TableDisplayedColumn[]
