import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import type { DXSkill, DXSkillCodename } from '~entities/dx-skills/dx-skills.type'
import { DXSkillCardComponent } from '~ui/dx-skills/dx-skill-card/dx-skill-card.component'
import {
  DXSkillLogotypeComponentsUtil,
  type DXSkillLogotypeComponentType,
} from '~ui/dx-skills/logotypes/dx-skill-logotype-components.util'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgComponentOutlet,
    NgTemplateOutlet,

    // Provided by the app.
    DXSkillCardComponent,
  ],
  selector: 'app-dx-skills',
  styleUrl: './dx-skills.component.sass',
  templateUrl: './dx-skills.component.html',
})
export class DXSkillsComponent {
  public readonly skills = input.required<readonly DXSkill[]>()
  public readonly titleText = input.required<string>()

  protected readonly skillsForTemplate = computed<readonly DXSkillForTemplate[]>(() => {
    return this.skills().map(this.#prepareDXSkillForTemplate.bind(this))
  })

  #prepareDXSkillForTemplate({ codename, name, url }: DXSkill): DXSkillForTemplate {
    return {
      codename,
      logotypeComponent: DXSkillLogotypeComponentsUtil.getComponent(codename),
      name,
      url,
    }
  }
}

interface DXSkillForTemplate {
  readonly codename: DXSkillCodename
  readonly logotypeComponent: DXSkillLogotypeComponentType
  readonly name: DXSkill['name']
  readonly url: DXSkill['url']
}
