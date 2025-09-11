import type { Brand } from '../../brand-type-utility'

export interface DXSkill {
  readonly codename: DXSkillCodename
  readonly name: string
  readonly url: string
}

export type DXSkillCodename = Brand<string, 'dx skill codename'>
