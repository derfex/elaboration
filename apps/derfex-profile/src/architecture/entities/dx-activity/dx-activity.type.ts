// import type { DXSkillCodename } from '~entities/dx-skills/dx-skills.type'
import type { Brand } from '../../brand-type-utility'

export interface DXActivity {
  readonly codename: DXActivityCodename
  readonly periodFrom: Date
  readonly periodTo: Date | null
  readonly results: readonly string[]
  readonly role: string
  readonly shortDescription: string
  readonly skills: readonly string[]

  // TODO?: Use?
  // readonly descriptionParagraphList: readonly string[]
  // readonly responsibilitiesParagraphList: readonly string[]
  // readonly skillsSet: ReadonlySet<DXSkillCodename>
}

export type DXActivityCodename = Brand<string, 'dx activity codename'>
