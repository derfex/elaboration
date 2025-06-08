// # External modules
import { SelectionModel } from '@angular/cdk/collections'
import { ChangeDetectionStrategy, Component, Input, type OnInit, ViewChild } from '@angular/core'
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
import { PSEmptinessComponent } from '../../ui-kit/ps-emptiness/ps-emptiness.component'
import type { PSProductTableItem } from './ps-products.type'

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
  styleUrl: './ps-products.component.sass',
  templateUrl: './ps-products.component.html',
})
export class PSProductsComponent implements OnInit {
  // region ## Properties
  protected dataSource: MatTableDataSource<PSProductTableItem> = new MatTableDataSource<PSProductTableItem>([])
  protected displayedColumns: readonly string[] = ['select', 'number', 'name', 'parent', 'price']
  protected selection = new SelectionModel<PSProductTableItem>(true, [])

  private filterPrivate: number | null = null
  private itemsPrivate: readonly PSProductTableItem[] = []

  @Input()
  public set items(items: readonly PSProductTableItem[]) {
    this.itemsPrivate = items
    this.dataSource.data = [...items]
  }

  public get items(): readonly PSProductTableItem[] {
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

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    this.dataSource.filterPredicate = (data: PSProductTableItem, filter: string): boolean =>
      data.parent.id === +filter
  }

  // endregion ## Lifecycle hooks

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
  protected checkboxLabel(row?: PSProductTableItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`
  }

  public get selected(): readonly PSProductTableItem[] {
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
