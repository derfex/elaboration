import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import type { DXSkill } from '~entities/dx-skills/dx-skills.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dx-skills',
  styleUrl: './dx-skills.component.sass',
  templateUrl: './dx-skills.component.html',
})
export class DXSkillsComponent {
  public readonly skills = input.required<readonly DXSkill[]>()
  public readonly titleText = input.required<string>()

  protected readonly skillsText = computed<string>(() => {
    return this.skills()
      .map(({ name }: DXSkill): string => name)
      .join(', ')
  })
}
