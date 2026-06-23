import type { DXSkill, DXSkillCodename } from '~entities/dx-skills/dx-skills.type'

export interface DXSkillsListItem {
  readonly codename: DXSkillCodename
  readonly name: DXSkill['name']
  readonly proficiencyLevelListItems: DXSkill['proficiencyLevelListItems']
  readonly referenceCaption: DXSkill['referenceCaption']
  readonly referenceURL: DXSkill['referenceURL']
  readonly shortDescription: DXSkill['shortDescription']
}
