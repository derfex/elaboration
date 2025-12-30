import type { Brand } from '../../brand-type.util'

export interface DXActivity {
  readonly achievements: readonly string[]
  readonly codename: DXActivityCodename
  readonly periodFrom: Date
  readonly periodTo: Date | null
  readonly role: string
  readonly shortDescription: string
  readonly skillsSet: ReadonlySet<DXActivitySkillCodename>

  // TODO?: Use?
  // readonly descriptionParagraphList: readonly string[]
  // readonly responsibilitiesParagraphList: readonly string[]
}

export type DXActivityCodename = Brand<string, 'dx activity codename'>
export type DXActivitySkillCodename = Brand<string, 'dx activity skill codename'>
