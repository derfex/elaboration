// # External modules
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatButton } from '@angular/material/button'

// # Internal modules
import { PSCartComponent } from '../integrator/ui/ps-cart/ps-cart.component'
import { PSCartService } from '../integrator/ui/ps-cart/ps-cart.service'
import type { PSCartState } from '../integrator/ui/ps-cart/ps-cart.service.type'
import { PSCategoriesSelectComponent } from '../integrator/ui/ps-categories/ps-categories-select/ps-categories-select.component'
import { PSProductsComponent } from '../integrator/ui/ps-products/ps-products.component'
import { ProductsHTTPService } from './products/services-implementation/products-http/products-http.service'
import type { ProductTableViewModel } from './products/shared/product-table-view.model'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButton,

    // Provided by the app.
    PSCartComponent,
    PSCategoriesSelectComponent,
    PSProductsComponent,
  ],
  selector: 'app-shop',
  styleUrl: './shop.component.sass',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  // region ## Properties
  protected productsInList: readonly ProductTableViewModel[] = []
  protected productsInCart: readonly ProductTableViewModel[] = []

  readonly #cdr = inject(ChangeDetectorRef)
  readonly #destroyRef = inject(DestroyRef)
  readonly #psCartService = inject(PSCartService)
  readonly #psProductsService = inject(ProductsHTTPService)

  private products: readonly ProductTableViewModel[] = []
  private keysInCart: Set<number> = new Set()

  // endregion ## Properties

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    this.#fetchProductsToCart()
    this.#fetchProductsToList()
  }

  // endregion ## Lifecycle hooks

  // region ## Public API
  public addToCart(productsComponent: PSProductsComponent): void {
    this.#psCartService.addProducts(productsComponent.selected)
    productsComponent.clearSelection()
  }

  // endregion ## Public API

  // region ## Methods
  #fetchProductsToCart(): void {
    this.#psCartService.state.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      error: (error: unknown): void => {
        throw error
      },
      next: (payload: PSCartState): void => {
        this.productsInCart = payload.items
        this.keysInCart = payload.keysSet
        this.productsInList = this.products.filter(this.needInList, this)
      },
    })
  }

  #fetchProductsToList(): void {
    this.#psProductsService
      .readList()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        error: (error: unknown): void => {
          throw error
        },
        next: (data: readonly ProductTableViewModel[]): void => {
          this.products = data
          this.productsInList = data.filter(this.needInList, this)
          this.#cdr.markForCheck()
        },
      })
  }

  private needInList(product: ProductTableViewModel): boolean {
    return !this.keysInCart.has(product.id)
  }

  // endregion ## Methods
}
