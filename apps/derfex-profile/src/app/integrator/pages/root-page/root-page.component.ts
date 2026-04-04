import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { LoadingNotifierService } from '~integrator/data-access/loading-notifier/loading-notifier.service'
import { LayoutLoaderComponent } from '~ui-kit/layout/layout-loader/layout-loader.component'
import { LayoutSectionSeparatorComponent } from '~ui-kit/layout/layout-section-separator/layout-section-separator.component'
import { DXActivitiesSectionComponent } from '~ui/dx-activities/dx-activities-section/dx-activities-section.component'
import { DXProjectsSectionComponent } from '~ui/dx-projects/dx-projects-section/dx-projects-section.component'
import { DXSkillsSectionComponent } from '~ui/dx-skills/dx-skills-section/dx-skills-section.component'
import { HeaderSectionComponent } from '~ui/header-section/header-section.component'
import { HeroSectionComponent } from '~ui/root-page/hero/hero-section/hero-section.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    DXActivitiesSectionComponent,
    DXProjectsSectionComponent,
    DXSkillsSectionComponent,
    HeaderSectionComponent,
    HeroSectionComponent,
    LayoutLoaderComponent,
    LayoutSectionSeparatorComponent,
  ],
  selector: 'app-root-page',
  styleUrl: './root-page.component.sass',
  templateUrl: './root-page.component.html',
})
export class RootPageComponent {
  readonly #loadingNotifierService = inject(LoadingNotifierService)

  protected loading = toSignal(this.#loadingNotifierService.loading, { initialValue: true })
}
