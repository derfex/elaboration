import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { DXProjectCardComponent } from '~ui/dx-projects/dx-project-card/dx-project-card.component'
import type { DXProject } from '~ui/dx-projects/dx-projects-section/dx-projects-section.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    DXProjectCardComponent,
  ],
  selector: 'app-dx-projects',
  styleUrl: './dx-projects.component.sass',
  templateUrl: './dx-projects.component.html',
})
export class DXProjectsComponent {
  public readonly descriptionText = input.required<string>()
  public readonly projects = input.required<readonly any[]>()
  public readonly titleText = input.required<string>()

  protected readonly projectsForTemplate = computed<readonly DXProjectForTemplate[]>(() => {
    return this.projects().map(this.#prepareDXSkillForTemplate.bind(this))
  })

  #prepareDXSkillForTemplate({ codename, name, resultURL, sourceURL }: DXProject): DXProjectForTemplate {
    return {
      codename,
      name,
      resultURL,
      sourceURL,
    }
  }
}

interface DXProjectForTemplate {
  readonly codename: string
  readonly name: string
  readonly resultURL: string
  readonly sourceURL: string
}
