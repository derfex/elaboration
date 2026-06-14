import type { DXSkill, DXSkillCodename } from '~entities/dx-skills/dx-skills.type'

export interface DXSkillsListItem {
  readonly codename: DXSkillCodename
  readonly detailsURL: DXSkill['detailsURL']
  readonly detailsURLText: DXSkill['detailsURLText']
  readonly name: DXSkill['name']
}
