import { ChangeDetectionStrategy, Component } from '@angular/core'
import { HeaderSectionComponent } from '~ui/header-section/header-section.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    HeaderSectionComponent,
  ],
  selector: 'app-root-page',
  styleUrl: './root-page.component.sass',
  templateUrl: './root-page.component.html',
})
export class RootPageComponent {}
