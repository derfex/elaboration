import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AppFooterSectionComponent } from '~ui/app-footer-section/app-footer-section.component'
import { AppHeroSectionComponent } from '~ui/app-hero-section/app-hero-section.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    AppFooterSectionComponent,
    AppHeroSectionComponent,
  ],
  selector: 'app-root-page',
  styleUrl: './root-page.component.sass',
  templateUrl: './root-page.component.html',
})
export class RootPageComponent {}
