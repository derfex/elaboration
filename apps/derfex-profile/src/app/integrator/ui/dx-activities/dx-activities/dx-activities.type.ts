import type { DXActivity, DXActivityCodename } from '~entities/dx-activities/dx-activities.type'

export interface DXActivitiesListItem {
  readonly achievements: DXActivity['achievements']
  readonly codename: DXActivityCodename
  readonly period: string
  readonly role: DXActivity['role']
  readonly shortDescription: DXActivity['shortDescription']
  readonly skills: readonly string[]
}
