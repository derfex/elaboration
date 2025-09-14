import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import type { DXSkill } from '~entities/dx-skills/dx-skills.type'
import { DXSkillCardComponent } from '~ui/dx-skills/dx-skill-card/dx-skill-card.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DXSkillCardComponent],
  selector: 'app-dx-skills',
  styleUrl: './dx-skills.component.sass',
  templateUrl: './dx-skills.component.html',
})
export class DXSkillsComponent {
  public readonly skills = input.required<readonly DXSkill[]>()
  public readonly titleText = input.required<string>()
}
