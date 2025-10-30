export interface BackendAPIConfigurationForBE {
  readonly dxActivitiesSectionCompiledRelativeURL: string
  readonly dxActivitiesSectionRelativeURL: string
}

export type BackendAPIRelativeURLCodenameForBE = keyof BackendAPIConfigurationForBE

export type BackendAPIURLCodename =
  | 'compiled/dxActivities/section'
  | 'sections/dxActivities'
