// External modules.
import { NgForOf } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatOption } from '@angular/material/core'
import { MatFormField, MatLabel } from '@angular/material/input'
import { MatSelect } from '@angular/material/select'
import { Subscription } from 'rxjs'

// Internal modules.
import { CategoriesService, CategoryModels } from '../../services/categories.service'

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
  protected items: CategoryModels = []
  protected selectedID: number | null = null
  private subscriptionToCategories: Subscription | undefined

  // endregion ## Properties

  constructor(private readonly categoriesService: CategoriesService) {}

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    // FIXME: Unsubscribe.
    this.subscriptionToCategories = this.categoriesService.getAll().subscribe(
      (data: CategoryModels) => {
        this.items = data
      },
      (error: unknown): void => {
        throw error
      },
    )
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  public get selected(): number {
    return this.selectedID ?? 0
  }

  // endregion ## Methods
}
