// # External modules
import { NgForOf } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms'
import { MatOption } from '@angular/material/core'
import { MatFormField, MatLabel } from '@angular/material/input'
import { MatSelect } from '@angular/material/select'

// # Internal modules
import { PSCategoriesForBEService } from '../../../../integrator/backend-api/ps-categories/ps-categories-for-be.service'
import type { PSCategory } from '../../../../integrator/backend-api/ps-categories/ps-categories-for-be.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,

    //
  ],
  selector: 'app-categories-select',
  standalone: true, // TODO: Can we delete `standalone: true` for Angular@19?
  styleUrls: ['./categories-select.component.sass'],
  templateUrl: './categories-select.component.html',
})
export class CategoriesSelectComponent implements OnInit {
  // region ## Properties
  protected items: readonly PSCategory[] = []
  protected selectedID: number | null = null

  readonly #destroyRef = inject(DestroyRef)
  readonly #psCategoriesForBEService = inject(PSCategoriesForBEService)

  // endregion ## Properties

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    this.#fetchCategories()
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  public get selected(): number {
    return this.selectedID ?? 0
  }

  #fetchCategories(): void {
    this.#psCategoriesForBEService
      .readList()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        error: (error: unknown): void => {
          throw error
        },
        next: (data: readonly PSCategory[]) => {
          this.items = data
        },
      })
  }

  // endregion ## Methods
}
