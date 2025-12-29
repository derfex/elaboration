import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { LoadingNotifierService } from '~integrator/data-access/loading-notifier/loading-notifier.service'
import { LayoutLoaderComponent } from '~ui-kit/layout/layout-loader/layout-loader.component'
import { LayoutSectionSeparatorComponent } from '~ui-kit/layout/layout-section-separator/layout-section-separator.component'
import { UIKitSectionComponent } from '~ui-kit/ui-kit-presentation/ui-kit-section/ui-kit-section.component'
import { HeaderSectionComponent } from '~ui/header-section/header-section.component'
import { HeroSectionComponent } from '~ui/hero-section/hero-section.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    HeaderSectionComponent,
    HeroSectionComponent,
    LayoutLoaderComponent,
    LayoutSectionSeparatorComponent,
    UIKitSectionComponent,
  ],
  selector: 'app-ui-kit-page',
  styleUrl: './ui-kit-page.component.sass',
  templateUrl: './ui-kit-page.component.html',
})
export class UIKitPageComponent {
  readonly #loadingNotifierService = inject(LoadingNotifierService)

  protected loading = toSignal(this.#loadingNotifierService.loading, { initialValue: true })
}
