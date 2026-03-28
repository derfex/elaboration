import type { DXSkill, DXSkillCodename } from '~entities/dx-skills/dx-skills.type'

// TODO?: Do we need it?
export const dxSkills = [
  {
    codename: 'Angular' as DXSkillCodename,
    name: 'Angular',
    url: 'https://angular.dev',
  },
  {
    codename: 'HTML5' as DXSkillCodename,
    name: 'HTML5',
    url: 'https://developer.mozilla.org/docs/Web/HTML',
  },
  {
    codename: 'CSS' as DXSkillCodename,
    name: 'CSS',
    url: 'https://developer.mozilla.org/docs/Web/CSS',
  },
  {
    codename: 'JS' as DXSkillCodename,
    name: 'JavaScript',
    url: 'https://developer.mozilla.org/docs/Web/JavaScript',
  },
  {
    codename: 'TS' as DXSkillCodename,
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org',
  },
  {
    codename: 'NodeJS' as DXSkillCodename,
    name: 'Node.js',
    url: 'https://nodejs.org',
  },
  {
    codename: 'GitHub' as DXSkillCodename,
    name: 'GitHub',
    url: 'https://github.com',
  },
] as const satisfies readonly DXSkill[]
