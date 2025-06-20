// # External modules
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatButton } from '@angular/material/button'

// # Internal modules
import { PSProductsMediatorService } from '../../data-access/ps-products/ps-products-mediator.service'
import { PSCartComponent } from '../ps-cart/ps-cart.component'
import { PSCartService } from '../ps-cart/ps-cart.service'
import type { PSCartState } from '../ps-cart/ps-cart.service.type'
import { PSCategoriesSelectComponent } from '../ps-categories/ps-categories-select/ps-categories-select.component'
import { PSProductsComponent } from '../ps-products/ps-products.component'
import type { PSProductTableItem } from '../ps-products/ps-products.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButton,

    // Provided by the app.
    PSCartComponent,
    PSCategoriesSelectComponent,
    PSProductsComponent,
  ],
  selector: 'app-pet-shop',
  styleUrl: './pet-shop.component.sass',
  templateUrl: './pet-shop.component.html',
})
export class PetShopComponent implements OnInit {
  // region ## Properties
  protected productsInList: readonly PSProductTableItem[] = []
  protected productsInCart: readonly PSProductTableItem[] = []

  readonly #cdr = inject(ChangeDetectorRef)
  readonly #destroyRef = inject(DestroyRef)
  #keysInCart: Set<number> = new Set()
  #products: readonly PSProductTableItem[] = []
  readonly #psCartService = inject(PSCartService)
  readonly #psProductsMediatorService = inject(PSProductsMediatorService)

  // endregion ## Properties

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    this.#fetchProductsToCart()
    this.#fetchProductsToList()
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  protected addToCart(productsComponent: PSProductsComponent): void {
    this.#psCartService.addProducts(productsComponent.selected)
    productsComponent.clearSelection()
  }

  #fetchProductsToCart(): void {
    this.#psCartService.state.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      error: (error: unknown): void => {
        throw error
      },
      next: (payload: PSCartState): void => {
        this.productsInCart = payload.items
        this.#keysInCart = payload.keysSet
        this.productsInList = this.#products.filter(this.#needInList, this)
      },
    })
  }

  #fetchProductsToList(): void {
    this.#psProductsMediatorService
      .readList()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        error: (error: unknown): void => {
          throw error
        },
        next: (products: readonly PSProductTableItem[]): void => {
          this.#products = products
          this.productsInList = products.filter(this.#needInList, this)
          this.#cdr.markForCheck()
        },
      })
  }

  #needInList(product: PSProductTableItem): boolean {
    return !this.#keysInCart.has(product.id)
  }

  // endregion ## Methods
}
