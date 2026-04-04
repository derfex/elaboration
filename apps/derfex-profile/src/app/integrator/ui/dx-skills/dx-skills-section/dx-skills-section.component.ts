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
import { DXSkillsSectionMediatorService } from '~be/dx-skills/dx-skills-section-mediator.service'
import { LayoutSectionUtil } from '~ui-kit/layout/layout-section.util'
import type { DXSkillsSectionParametersAndList } from '~ui/dx-skills/dx-skills-section/dx-skills-section.type'
import { DXSkillsComponent } from '~ui/dx-skills/dx-skills/dx-skills.component'
import type { DXSkillsListItem } from '~ui/dx-skills/dx-skills/dx-skills.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DXSkillsComponent],
  selector: 'app-dx-skills-section',
  styleUrl: './dx-skills-section.component.sass',
  templateUrl: './dx-skills-section.component.html',
})
export class DXSkillsSectionComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #dxSkillsSectionMediatorService = inject(DXSkillsSectionMediatorService)

  public readonly number = input.required<number>()

  protected readonly numberText = computed<string>(() => LayoutSectionUtil.convertNumber(this.number()))
  protected readonly sectionParameters = signal({
    descriptionText: 'No data',
    skills: [] as readonly DXSkillsListItem[],
    titleText: 'No data',
  })

  public ngOnInit(): void {
    this.#dxSkillsSectionMediatorService
      .readSectionParametersAndList()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(({ list, sectionParameters }: DXSkillsSectionParametersAndList): void => {
        this.sectionParameters.set({
          descriptionText: sectionParameters.descriptionText,
          skills: list,
          titleText: sectionParameters.titleText,
        })
      })
  }
}
