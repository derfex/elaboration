import type { Brand } from '../../brand-type.util'

export interface DXActivity {
  readonly codename: DXActivityCodename
  readonly periodFrom: Date
  readonly periodTo: Date | null
  readonly results: readonly string[]
  readonly role: string
  readonly shortDescription: string
  readonly skillsSet: ReadonlySet<DXActivitySkillCodename>

  // TODO?: Use?
  // readonly descriptionParagraphList: readonly string[]
  // readonly responsibilitiesParagraphList: readonly string[]
}

export type DXActivityCodename = Brand<string, 'dx activity codename'>
export type DXActivitySkillCodename = Brand<string, 'dx activity skill codename'>
