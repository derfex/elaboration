import type { DXSkill, DXSkillCodename } from '~entities/dx-skills/dx-skills.type'

export interface DXSkillsListItem {
  readonly codename: DXSkillCodename
  readonly name: DXSkill['name']
  readonly referenceURL: DXSkill['referenceURL']
  readonly referenceURLText: DXSkill['referenceURLText']
  readonly shortDescription: DXSkill['shortDescription']
}
