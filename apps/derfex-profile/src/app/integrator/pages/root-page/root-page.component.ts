import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LayoutSectionSeparatorComponent } from '~ui-kit/layout/layout-section-separator/layout-section-separator.component'
import { DXProjectsSectionComponent } from '~ui/dx-projects/dx-projects-section/dx-projects-section.component'
import { DXSkillsSectionComponent } from '~ui/dx-skills/dx-skills-section/dx-skills-section.component'
import { HeaderSectionComponent } from '~ui/header-section/header-section.component'
import { HeroSectionComponent } from '~ui/hero-section/hero-section.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    DXProjectsSectionComponent,
    DXSkillsSectionComponent,
    HeaderSectionComponent,
    HeroSectionComponent,
    LayoutSectionSeparatorComponent,
  ],
  selector: 'app-root-page',
  styleUrl: './root-page.component.sass',
  templateUrl: './root-page.component.html',
})
export class RootPageComponent {}
