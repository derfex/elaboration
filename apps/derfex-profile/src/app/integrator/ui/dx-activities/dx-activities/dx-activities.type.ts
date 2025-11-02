import type { DXActivity, DXActivityCodename } from '~entities/dx-activities/dx-activities.type'

export interface DXActivitiesListItem {
  readonly codename: DXActivityCodename
  readonly period: string
  readonly results: DXActivity['results']
  readonly role: DXActivity['role']
  readonly shortDescription: DXActivity['shortDescription']
  readonly skills: readonly string[]
}
