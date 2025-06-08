// # External modules
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms'
import { MatOption } from '@angular/material/core'
import { MatFormField, MatLabel } from '@angular/material/input'
import { MatSelect } from '@angular/material/select'

// # Internal modules
import type { PSProductCategory } from '../../../../../architecture/entities/ps-product-categories/ps-product-categories.type'
import { PSCategoriesForBEService } from '../../../data-access/backend-api/ps-categories/ps-categories-for-be.service'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,

    //
  ],
  selector: 'app-ps-categories-select',
  standalone: true, // TODO: Can we delete `standalone: true` for Angular@19?
  styleUrl: './ps-categories-select.component.sass',
  templateUrl: './ps-categories-select.component.html',
})
export class PSCategoriesSelectComponent implements OnInit {
  // region ## Properties
  protected items: readonly PSProductCategory[] = []
  protected selectedID: number | null = null

  readonly #destroyRef = inject(DestroyRef)
  readonly #psCategoriesForBEService = inject(PSCategoriesForBEService)

  // endregion ## Properties

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    this.#fetchCategories()
  }

  // endregion ## Lifecycle hooks

  // region ## Public API
  public get selected(): number {
    return this.selectedID ?? 0
  }

  // endregion ## Public API

  // region ## Methods
  #fetchCategories(): void {
    this.#psCategoriesForBEService
      .readList()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        error: (error: unknown): void => {
          throw error
        },
        next: (data: readonly PSProductCategory[]): void => {
          this.items = data
        },
      })
  }

  // endregion ## Methods
}
