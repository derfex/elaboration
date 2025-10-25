import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import type { DXActivityCodename } from '~entities/dx-activity/dx-activity.type'
import type { DXActivitiesListItem } from '~ui/dx-activities/dx-activities/dx-activities.type'
import { DXActivityCardComponent } from '~ui/dx-activities/dx-activity-card/dx-activity-card.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DXActivityCardComponent],
  selector: 'app-dx-activities',
  styleUrl: './dx-activities.component.sass',
  templateUrl: './dx-activities.component.html',
})
export class DXActivitiesComponent {
  public readonly activities = input.required<readonly DXActivitiesListItem[]>()
  public readonly activitySkillsTitleText = input.required<string>()
  public readonly descriptionText = input.required<string>()
  public readonly emptyStateText = input.required<string>()
  public readonly titleText = input.required<string>()

  protected readonly activitiesForTemplate = computed<readonly DXActivityForTemplate[]>(() => {
    return this.activities().map(this.#prepareDXActivityForTemplate.bind(this))
  })

  // TODO: Do we need `DXActivityForTemplate` and `#prepareDXActivityForTemplate(1)`.
  #prepareDXActivityForTemplate({
    codename,
    period,
    results,
    role,
    shortDescription,
    skills,
  }: DXActivitiesListItem): DXActivityForTemplate {
    return {
      codename,
      period,
      results,
      role,
      shortDescription,
      skills,
    }
  }
}

interface DXActivityForTemplate {
  readonly codename: DXActivityCodename
  readonly period: DXActivitiesListItem['period']
  readonly results: DXActivitiesListItem['results']
  readonly role: DXActivitiesListItem['role']
  readonly shortDescription: DXActivitiesListItem['shortDescription']
  readonly skills: DXActivitiesListItem['skills']
}
