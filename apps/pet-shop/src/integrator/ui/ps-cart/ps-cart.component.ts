// # External modules
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
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
  public readonly items = input.required<readonly PSProductTableItem[]>()

  protected readonly dataSource = computed<MatTableDataSource<PSProductTableItem>>(
    () => new MatTableDataSource<PSProductTableItem>([...this.items()]),
  )

  protected readonly displayedColumns: DisplayedColumns = ['action', 'number', 'name', 'category', 'price']

  readonly #psCartService = inject(PSCartService)
  // endregion ## Properties

  // region ## Methods
  protected hasDisplayedData(): boolean {
    return !!this.dataSource().filteredData.length
  }

  protected deleteItem(id: number): void {
    this.#psCartService.deleteProductByID(id)
  }
  // endregion ## Methods
}

type DisplayedColumn = 'action' | 'category' | 'name' | 'number' | 'price'
type DisplayedColumns = readonly DisplayedColumn[]
