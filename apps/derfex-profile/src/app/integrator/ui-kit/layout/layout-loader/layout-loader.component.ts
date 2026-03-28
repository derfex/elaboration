import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DerfexLogotypeComponent } from '~ui-kit/identity/derfex-logotype/derfex-logotype.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DerfexLogotypeComponent],
  selector: 'app-layout-loader',
  styleUrl: './layout-loader.component.sass',
  templateUrl: './layout-loader.component.html',
})
export class LayoutLoaderComponent {}
