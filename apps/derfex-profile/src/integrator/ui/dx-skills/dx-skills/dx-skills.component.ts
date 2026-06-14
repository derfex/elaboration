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

  protected readonly skillDetails = computed<DXSkillDetailsForTemplate>(() => {
    const skill = this.#skillsMap().get(this.#skillDetailsCodename())
    if (skill) {
      const { codename, detailsURL, detailsURLText, name } = skill
      return {
        codename,
        detailsURL,
        detailsURLText,
        logotypeComponent: DXSkillLogotypeComponentsUtil.getComponent(codename),
        name,
      }
    }
    return {
      codename: 'NoData' as DXSkillCodename,
      detailsURL: 'NoData',
      detailsURLText: 'No data',
      logotypeComponent: DXSkillLogotypeComponentsUtil.getComponent('Angular' as DXSkillCodename),
      name: 'No data',
    }
  })
  protected readonly skillsSummaryForTemplate = computed<readonly DXSkillSummaryForTemplate[]>(() => {
    return this.skills().map(this.#prepareDXSkillForTemplate.bind(this))
  })

  readonly #skillDetailsCodename = linkedSignal<DXSkillCodename>(() => {
    const [skill] = this.skills()
    return skill ? skill.codename : ('NoData' as DXSkillCodename)
  })
  readonly #skillsMap = computed<DXSkillsReadonlyMap>(() => {
    return this.#prepareDXSkillsMap(this.skills())
  })

  #prepareDXSkillForTemplate({ codename, name }: DXSkill): DXSkillSummaryForTemplate {
    return {
      codename,
      logotypeComponent: DXSkillLogotypeComponentsUtil.getComponent(codename),
      name,
    }
  }

  #prepareDXSkillsMap(skills: readonly DXSkill[]): DXSkillsReadonlyMap {
    return new Map<DXSkillCodename, DXSkill>(
      skills.map(({ codename, detailsURL, detailsURLText, name }): [DXSkillCodename, DXSkill] => [
        codename,
        { codename, detailsURL, detailsURLText, name },
      ]),
    )
  }
}

interface DXSkillDetailsForTemplate {
  readonly codename: DXSkillCodename
  readonly detailsURL: DXSkill['detailsURL']
  readonly detailsURLText: DXSkill['detailsURLText']
  readonly logotypeComponent: DXSkillLogotypeComponentType
  readonly name: DXSkill['name']
}

interface DXSkillSummaryForTemplate {
  readonly codename: DXSkillCodename
  readonly logotypeComponent: DXSkillLogotypeComponentType
  readonly name: DXSkill['name']
}

type DXSkillsReadonlyMap = ReadonlyMap<DXSkillCodename, DXSkill>
