import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core'
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
  public readonly descriptionText = input.required<string>()
  public readonly skills = input.required<readonly DXSkill[]>()
  public readonly titleText = input.required<string>()

  protected readonly skillsForTemplate = computed<readonly DXSkillForTemplate[]>(() => {
    return this.skills().map(this.#prepareDXSkillForTemplate.bind(this))
  })

  protected readonly url = computed<string>(() => {
    const skill = this.#skillsMap().get(this.#detailsSkillCodename())
    return skill ? skill.url : 'NoData'
  })

  readonly #skillsMap = computed<DXSkillsReadonlyMap>(() => {
    return this.#prepareDXSkillsMap(this.skills())
  })

  readonly #detailsSkillCodename = linkedSignal<DXSkillCodename>(() => {
    const [skill] = this.skills()
    return skill ? skill.codename : ('NoData' as DXSkillCodename)
  })

  #prepareDXSkillForTemplate({ codename, name, url }: DXSkill): DXSkillForTemplate {
    return {
      codename,
      logotypeComponent: DXSkillLogotypeComponentsUtil.getComponent(codename),
      name,
      url,
    }
  }

  #prepareDXSkillsMap(skills: readonly DXSkill[]): DXSkillsReadonlyMap {
    return new Map<DXSkillCodename, DXSkill>(
      skills.map(({ codename, name, url }): [DXSkillCodename, DXSkill] => [codename, { codename, name, url }]),
    )
  }
}

interface DXSkillForTemplate {
  readonly codename: DXSkillCodename
  readonly logotypeComponent: DXSkillLogotypeComponentType
  readonly name: DXSkill['name']
  readonly url: DXSkill['url']
}

type DXSkillsReadonlyMap = ReadonlyMap<DXSkillCodename, DXSkill>
