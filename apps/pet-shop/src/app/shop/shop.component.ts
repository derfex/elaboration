// External modules.
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { type Subscription } from 'rxjs'

// Internal modules.
import { CartComponent } from './cart/cart.component'
import { CartService } from './cart/shared/cart.service'
import { ProductsComponent } from './products/products.component'
import { ProductsHTTPService } from './products/services-implementation/products-http/products-http.service'
import { type IProductTableViewModel } from './products/shared/product-table-view.model'
import { CategoriesSelectComponent } from './shared/components/categories-select/categories-select.component'

// Definitions.
type Products = IProductTableViewModel[]

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButton,

    // Provided by the app.
    CartComponent,
    CategoriesSelectComponent,
    ProductsComponent,
  ],
  selector: 'app-shop',
  standalone: true, // TODO: Can we delete `standalone: true` for Angular@19?
  styleUrl: './shop.component.sass',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit, OnDestroy {
  // region ## Properties
  readonly #cdr = inject(ChangeDetectorRef)

  private products: Products = []
  protected productsInList: Products = []
  protected productsInCart: Products = []
  private keysInCart: Set<number> = new Set()
  private subscriptionToCart: Subscription | undefined

  // endregion ## Properties

  constructor(
    private readonly cartService: CartService,
    private readonly productsService: ProductsHTTPService,
  ) {}

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    this.productsService.getAll().subscribe({
      error: (error: unknown): void => {
        throw error
      },
      next: (data: Products): void => {
        this.products = data
        this.productsInList = data.filter(this.needInList, this)
        this.#cdr.markForCheck()
      },
    })

    this.subscriptionToCart = this.cartService.state.subscribe((payload): void => {
      this.productsInCart = payload.items
      this.keysInCart = payload.keys
      this.productsInList = this.products.filter(this.needInList, this)
    })
  }

  public ngOnDestroy(): void {
    // Unsubscribe to ensure no memory leaks.
    this.subscriptionToCart?.unsubscribe()
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  private needInList(product: IProductTableViewModel): boolean {
    return !this.keysInCart.has(product.id)
  }

  public addToCart(productsComponent: ProductsComponent): void {
    this.cartService.addProducts(productsComponent.selected)
    productsComponent.clearSelection()
  }

  // endregion ## Methods
}
