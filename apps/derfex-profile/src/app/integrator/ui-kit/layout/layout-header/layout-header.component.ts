import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DerfexLogotypeComponent } from '~ui-kit/identity/derfex-logotype/derfex-logotype.component'
import { AppSettingsComponent } from '~ui/app-settings/app-settings/app-settings.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    AppSettingsComponent,
    DerfexLogotypeComponent,
  ],
  selector: 'app-layout-header',
  styleUrl: './layout-header.component.sass',
  templateUrl: './layout-header.component.html',
})
export class LayoutHeaderComponent {}
