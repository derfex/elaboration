import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { LocaleUtil } from '~integrator/data-access/locale/locale.util'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dx-activity-card',
  styleUrl: './dx-activity-card.component.sass',
  templateUrl: './dx-activity-card.component.html',
})
export class DXActivityCardComponent {
  public readonly periodFrom = input.required<Date>()
  public readonly periodTo = input.required<Date | null>()
  public readonly results = input.required<readonly string[]>()
  public readonly role = input.required<string>()
  public readonly shortDescription = input.required<string>()
  public readonly skills = input.required<readonly string[]>()
  public readonly skillsTitleText = input.required<string>()

  protected readonly period = computed<string>(() => {
    return LocaleUtil.getPeriodTextWithRULocalization(this.periodFrom(), this.periodTo())
    // TODO?: Calculate length of the period. Example: `2021-01 – настоящее время · 4 г. 3 мес.`
  })
}
