import type { Brand } from '../../brand-type.util'

export interface DXSkill {
  readonly codename: DXSkillCodename
  readonly name: string
  readonly referenceURL: string
  readonly referenceURLText: string
  readonly shortDescription: string
}

export type DXSkillCodename = Brand<string, 'dx skill codename'>
