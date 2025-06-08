import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PetShopComponent } from '../../ui/pet-shop/pet-shop.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    PetShopComponent,
  ],
  selector: 'app-home-page',
  styleUrl: './home-page.component.sass',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
