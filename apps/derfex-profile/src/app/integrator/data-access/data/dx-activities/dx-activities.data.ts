import type { DXActivityCodename } from '~entities/dx-activity/dx-activity.type'
import { LocaleUtil } from '~integrator/data-access/locale/locale.util'
import type { DXActivitiesListItem } from '~ui/dx-activities/dx-activities/dx-activities.type'

export const dxActivities = [
  generateActivity(
    'Axe',
    'Junior full-stack developer',
    'A web studio',
    '2014-04',
    '2014-08-31',
    // [
    //   'A web studio.',
    //   'Development and maintenance of websites, mainly online stores. Analytics and optimization of resources. Contextual advertising.',
    // ],
    [],
    [
      'HTML',
      'CSS',
      'JavaScript',
      'PHP',
      'MySQL',
    ],
  ),
] as const satisfies readonly DXActivitiesListItem[]

export const dxActivitiesRU = [
  generateActivity(
    'Axe',
    'Junior full-stack developer',
    'Web-студия',
    '2014-04',
    '2014-08-31',
    // [
    //   'Web-студия',
    //   'Разработка и ведение сайтов, преимущественно интернет-магазинов. Аналитика и оптимизация ресурсов. Контекстная реклама.',
    // ],
    [
      'Вёрстка макетов, Javascript, асинхронные запросы к базе данных, PHP, MySQL. Большинство сайтов были созданы в команде.',
      'В одиночку с нуля разработал web-приложение на планшет для составления сметной спецификации и администрирования набора услуг.',
    ],
    [
      'HTML',
      'CSS',
      'JavaScript',
      'PHP',
      'MySQL',
    ],
  ),
] as const satisfies readonly DXActivitiesListItem[]

function generateActivity(
  codename: string,
  role: string,
  shortDescription: string,
  periodFrom: string,
  periodTo: string | null,
  results: readonly string[] = [],
  skills: readonly string[] = [],
): DXActivitiesListItem {
  const period = LocaleUtil.getPeriodTextWithENLocalization(new Date(periodFrom), periodTo ? new Date(periodTo) : null)
  return {
    codename: codename as DXActivityCodename,
    period,
    results,
    role,
    shortDescription,
    skills,
  }
}
