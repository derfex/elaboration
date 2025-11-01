import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import type { DXProjectCodename } from '~entities/dx-projects/dx-projects.type'
import { DXProjectCardComponent } from '~ui/dx-projects/dx-project-card/dx-project-card.component'
import type { DXProjectsListItem } from '~ui/dx-projects/dx-projects/dx-projects.type'

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
  public readonly emptyStateText = input.required<string>()
  public readonly projects = input.required<readonly DXProjectsListItem[]>()
  public readonly resultTitleText = input.required<string>()
  public readonly sourceCodeTitleText = input.required<string>()
  public readonly titleText = input.required<string>()

  protected readonly projectsForTemplate = computed<readonly DXProjectForTemplate[]>(() => {
    return this.projects().map(this.#prepareDXSkillForTemplate.bind(this))
  })

  #prepareDXSkillForTemplate({ codename, name, resultURL, sourceURL }: DXProjectsListItem): DXProjectForTemplate {
    return {
      codename,
      name,
      resultURL,
      sourceURL,
    }
  }
}

interface DXProjectForTemplate {
  readonly codename: DXProjectCodename
  readonly name: DXProjectsListItem['name']
  readonly resultURL: DXProjectsListItem['resultURL']
  readonly sourceURL: DXProjectsListItem['sourceURL']
}
