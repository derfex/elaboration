import type { Brand } from '../../brand-type.util'

export interface DXSkill {
  readonly codename: DXSkillCodename
  readonly descriptionListItems: readonly string[]
  readonly name: string
  readonly referenceCaption: string
  readonly referenceURL: string
  readonly shortDescription: string
}

export type DXSkillCodename = Brand<string, 'dx skill codename'>
