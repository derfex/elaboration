import type { DXActivity, DXActivityCodename } from '~entities/dx-activity/dx-activity.type'
import type { DXSkillCodename } from '~entities/dx-skills/dx-skills.type'

export const dxActivities = [
  generateActivity(
    'Axiom',
    'A web studio',
    '2014-04',
    '2014-08-31',
    [
      'A web studio.',
      'Development and maintenance of websites, mainly online stores. Analytics and optimization of resources. Contextual advertising.',
    ],
    [],
  ),
] as const satisfies readonly DXActivity[]

export const dxActivitiesRU = [
  generateActivity(
    'Axiom',
    'Web-студия',
    '2014-04',
    '2014-08-31',
    [
      'Разработка и ведение сайтов, преимущественно интернет-магазинов. Аналитика и оптимизация ресурсов. Контекстная реклама.',
    ],
    [
      'Вёрстка макетов, Javascript, асинхронные запросы к базе данных, PHP, MySQL. Большинство сайтов были созданы в команде.',
      'В одиночку с нуля разработал web-приложение на планшет для составления сметной спецификации и администрирования набора услуг.',
    ],
    [
      'HTML',
      'CSS',
      'JavaScript',
      // 'jQuery',
      'PHP',
      'MySQL',
    ],
  ),
] as const satisfies readonly DXActivity[]

function generateActivity(
  codename: string,
  name: string,
  dateStart: string,
  dateEnd: string,
  descriptionParagraphList: readonly string[] = [],
  responsibilitiesParagraphList: readonly string[] = [],
  skillsList: readonly string[] = [],
): DXActivity {
  return {
    codename: codename as DXActivityCodename,
    dateEnd: new Date(dateEnd),
    dateStart: new Date(dateStart),
    descriptionParagraphList,
    name,
    responsibilitiesParagraphList,
    skillsSet: new Set<DXSkillCodename>(skillsList as readonly DXSkillCodename[]),
  }
}
