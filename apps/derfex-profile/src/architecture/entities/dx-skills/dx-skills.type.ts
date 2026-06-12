import type { Brand } from '../../brand-type.util'

export interface DXSkill {
  readonly codename: DXSkillCodename
  readonly detailsURL: string
  readonly name: string
}

export type DXSkillCodename = Brand<string, 'dx skill codename'>
