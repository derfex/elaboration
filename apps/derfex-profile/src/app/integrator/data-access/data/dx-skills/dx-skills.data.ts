import type { DXSkill, DXSkillCodename } from '~entities/dx-skills/dx-skills.type'

export const dxSkills = [
  {
    codename: 'HTML5' as DXSkillCodename,
    name: 'HTML',
  },
  {
    codename: 'CSS' as DXSkillCodename,
    name: 'CSS',
  },
  {
    codename: 'JS' as DXSkillCodename,
    name: 'JavaScript',
  },
  {
    codename: 'TS' as DXSkillCodename,
    name: 'TypeScript',
  },
  {
    codename: 'NodeJS' as DXSkillCodename,
    name: 'Node.js',
  },
  {
    codename: 'Angular' as DXSkillCodename,
    name: 'Angular',
  },
] as const satisfies readonly DXSkill[]
