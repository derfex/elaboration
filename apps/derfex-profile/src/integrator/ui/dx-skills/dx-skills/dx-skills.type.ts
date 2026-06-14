import type { DXSkill, DXSkillCodename } from '~entities/dx-skills/dx-skills.type'

export interface DXSkillsListItem {
  readonly codename: DXSkillCodename
  readonly detailsURL: DXSkill['detailsURL']
  readonly detailsURLText: string
  readonly name: DXSkill['name']
}
