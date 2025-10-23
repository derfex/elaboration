import type { DXActivity, DXActivityCodename } from '~entities/dx-activity/dx-activity.type'

export interface DXActivitiesListItem {
  readonly codename: DXActivityCodename
  readonly periodFrom: DXActivity['periodFrom']
  readonly periodTo: DXActivity['periodTo']
  readonly results: DXActivity['results']
  readonly role: DXActivity['role']
  readonly shortDescription: DXActivity['shortDescription']
  readonly skills: readonly string[]
}
