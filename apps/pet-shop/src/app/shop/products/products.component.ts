// # External modules
import { SelectionModel } from '@angular/cdk/collections'
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatSort, MatSortModule, Sort } from '@angular/material/sort'
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
import { PSEmptinessComponent } from '../../integrator/ui-kit/ps-emptiness/ps-emptiness.component'
import { ProductTableViewModel } from './shared/product-table-view.model'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortModule,
    MatTable,

    // Provided by the app.
    PSEmptinessComponent,
  ],
  selector: 'app-ps-products',
  standalone: true, // TODO: Can we delete `standalone: true` for Angular@19?
  styleUrl: './ps-products.component.sass',
  templateUrl: './ps-products.component.html',
})
export class PSProductsComponent {
  // region ## Properties
  protected dataSource: MatTableDataSource<ProductTableViewModel> = new MatTableDataSource<ProductTableViewModel>([])
  protected displayedColumns: readonly string[] = ['select', 'number', 'name', 'parent', 'price']
  protected selection = new SelectionModel<ProductTableViewModel>(true, [])

  private filterPrivate: number | null = null
  private itemsPrivate: readonly ProductTableViewModel[] = []

  @Input()
  public set items(items: readonly ProductTableViewModel[]) {
    this.itemsPrivate = items
    this.dataSource.data = [...items]
  }

  public get items(): readonly ProductTableViewModel[] {
    return this.itemsPrivate
  }

  @Input()
  public set filter(filter: number) {
    this.filterPrivate = filter
    this.dataSource.filter = filter ? filter + '' : ''
  }

  public get filter(): number {
    return this.filterPrivate ?? 0
  }

  @ViewChild(MatSort, { static: false })
  sort: MatSort | undefined

  // endregion ## Properties

  constructor() {
    this.dataSource.filterPredicate = (data: ProductTableViewModel, filter: string): boolean =>
      data.parent.id === +filter
  }

  // region ## Methods
  protected sortData(sort: Sort): void {
    const data = this.itemsPrivate.slice()
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data
      return
    }

    data.sort((a, b) => {
      const isAsc = sort.direction === 'asc'
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc)
        case 'price':
          return compare(a.price, b.price, isAsc)
        default:
          return 0
      }
    })
    this.dataSource.data = data
  }

  protected hasDisplayedData(): boolean {
    return !!this.dataSource.filteredData.length
  }

  // region ### Selection
  // Whether the number of selected elements matches the total number of rows.
  protected isAllSelected(): boolean {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  protected masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear()
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row))
    }
  }

  // The label for the checkbox on the passed row.
  protected checkboxLabel(row?: ProductTableViewModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`
  }

  public get selected(): readonly ProductTableViewModel[] {
    return this.selection.selected
  }

  public clearSelection(): void {
    this.selection.clear()
  }

  // endregion ### Selection
  // endregion ## Methods
}

// Extra.
function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}
