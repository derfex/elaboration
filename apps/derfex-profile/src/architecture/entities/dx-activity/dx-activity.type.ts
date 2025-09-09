import type { DXSkillCodename } from '~entities/dx-skills/dx-skills.type'

export interface DXActivity {
  readonly codename: string
  readonly dateEnd: string
  readonly dateStart: string
  readonly name: string
  readonly skillsSet: ReadonlySet<DXSkillCodename>
}
