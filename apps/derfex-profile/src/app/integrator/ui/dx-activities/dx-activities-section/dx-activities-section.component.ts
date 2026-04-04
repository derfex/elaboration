import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  type OnInit,
  signal,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { DXActivitiesSectionMediatorService } from '~be/dx-activities/dx-activities-section-mediator.service'
import { LayoutSectionUtil } from '~ui-kit/layout/layout-section.util'
import type { DXActivitiesSectionParametersAndList } from '~ui/dx-activities/dx-activities-section/dx-activities-section.type'
import { DXActivitiesComponent } from '~ui/dx-activities/dx-activities/dx-activities.component'
import type { DXActivitiesListItem } from '~ui/dx-activities/dx-activities/dx-activities.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DXActivitiesComponent],
  selector: 'app-dx-activities-section',
  styleUrl: './dx-activities-section.component.sass',
  templateUrl: './dx-activities-section.component.html',
})
export class DXActivitiesSectionComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #dxActivitiesSectionMediatorService = inject(DXActivitiesSectionMediatorService)

  public readonly number = input.required<number>()

  protected readonly numberText = computed<string>(() => LayoutSectionUtil.convertNumber(this.number()))
  protected readonly sectionParameters = signal({
    activities: [] as readonly DXActivitiesListItem[],
    activityAchievementsTitleText: 'No data',
    activitySkillsTitleText: 'No data',
    descriptionText: 'No data',
    emptyStateText: 'No data',
    titleText: 'No data',
  })

  public ngOnInit(): void {
    this.#dxActivitiesSectionMediatorService
      .readSectionParametersAndList()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(({ list, sectionParameters }: DXActivitiesSectionParametersAndList): void => {
        this.sectionParameters.set({
          activities: list,
          activityAchievementsTitleText: sectionParameters.list.item.achievementsTitleText,
          activitySkillsTitleText: sectionParameters.list.item.skillsTitleText,
          descriptionText: sectionParameters.descriptionText,
          emptyStateText: sectionParameters.list.emptyStateText,
          titleText: sectionParameters.titleText,
        })
      })
  }
}
