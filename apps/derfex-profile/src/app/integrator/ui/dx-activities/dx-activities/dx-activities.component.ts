import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core'
import type { DXActivityCodename } from '~entities/dx-activities/dx-activities.type'
import type { DXActivitiesListItem } from '~ui/dx-activities/dx-activities/dx-activities.type'
import { DXActivityCardComponent } from '~ui/dx-activities/dx-activity-card/dx-activity-card.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    DXActivityCardComponent,
  ],
  selector: 'app-dx-activities',
  styleUrl: './dx-activities.component.sass',
  templateUrl: './dx-activities.component.html',
})
export class DXActivitiesComponent {
  public readonly activities = input.required<readonly DXActivitiesListItem[]>()
  public readonly activityAchievementsTitleText = signal<string>('') // TODO: replace.
  public readonly activitySkillsTitleText = input.required<string>()
  public readonly descriptionText = input.required<string>()
  public readonly emptyStateText = input.required<string>()
  public readonly titleText = input.required<string>()

  protected readonly activitiesForTemplate = computed<readonly DXActivityForTemplate[]>(() => {
    return this.activities().map(this.#prepareDXActivityForTemplate.bind(this))
  })

  // TODO: Do we need `DXActivityForTemplate` and `#prepareDXActivityForTemplate(1)`?
  #prepareDXActivityForTemplate({
    achievements,
    codename,
    period,
    role,
    shortDescription,
    skills,
  }: DXActivitiesListItem): DXActivityForTemplate {
    return {
      achievements,
      codename,
      period,
      role,
      shortDescription,
      skills,
    }
  }
}

interface DXActivityForTemplate {
  readonly achievements: DXActivitiesListItem['achievements']
  readonly codename: DXActivityCodename
  readonly period: DXActivitiesListItem['period']
  readonly role: DXActivitiesListItem['role']
  readonly shortDescription: DXActivitiesListItem['shortDescription']
  readonly skills: DXActivitiesListItem['skills']
}
