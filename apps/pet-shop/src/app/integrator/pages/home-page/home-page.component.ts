import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ShopComponent } from '../../../shop/shop.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    ShopComponent,
  ],
  selector: 'app-home-page',
  standalone: true, // TODO: Can we delete `standalone: true` for Angular@19?
  styleUrl: './home-page.component.sass',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
