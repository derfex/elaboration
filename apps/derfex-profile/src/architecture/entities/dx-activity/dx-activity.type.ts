import type { DXSkillCodename } from '~entities/dx-skills/dx-skills.type'
import type { Brand } from '../../brand-type-utility'

export interface DXActivity {
  readonly codename: DXActivityCodename
  readonly dateEnd: Date
  readonly dateStart: Date
  readonly descriptionParagraphList: readonly string[]
  readonly name: string
  readonly responsibilitiesParagraphList: readonly string[]
  readonly skillsSet: ReadonlySet<DXSkillCodename>
}

export type DXActivityCodename = Brand<string, 'dx activity codename'>
