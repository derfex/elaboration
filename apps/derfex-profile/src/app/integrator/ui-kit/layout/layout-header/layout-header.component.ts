import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DerfexLogotypeComponent } from '~ui-kit/identity/derfex-logotype/derfex-logotype.component'
import { LocaleSwitcherComponent } from '~ui/locale-switcher/locale-switcher/locale-switcher.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    DerfexLogotypeComponent,
    LocaleSwitcherComponent,
  ],
  selector: 'app-layout-header',
  styleUrl: './layout-header.component.sass',
  templateUrl: './layout-header.component.html',
})
export class LayoutHeaderComponent {}
