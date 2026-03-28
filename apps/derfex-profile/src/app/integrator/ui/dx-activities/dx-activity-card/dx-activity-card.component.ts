import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dx-activity-card',
  styleUrl: './dx-activity-card.component.sass',
  templateUrl: './dx-activity-card.component.html',
})
export class DXActivityCardComponent {
  public readonly achievements = input.required<readonly string[]>()
  public readonly achievementsTitleText = input.required<string>()
  // TODO?: Display a caption, like a tag, like a category of an activity.
  //  Examples: `web-studio`, `independent development.
  public readonly period = input.required<string>()
  // TODO?: Display length of the period. Example: `2021-01 – настоящее время · 4 г. 3 мес.`.
  public readonly role = input.required<string>()
  public readonly shortDescription = input.required<string>()
  public readonly skills = input.required<readonly string[]>()
  public readonly skillsTitleText = input.required<string>()
}
