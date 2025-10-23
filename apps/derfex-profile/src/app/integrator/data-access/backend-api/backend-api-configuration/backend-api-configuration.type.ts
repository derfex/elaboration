export interface BackendAPIConfigurationForBE {
  readonly dxActivitiesSectionRelativeURL: string
}

export type BackendAPIRelativeURLCodenameForBE = keyof BackendAPIConfigurationForBE

export type BackendAPIURLCodename =
  | 'sections/dxActivities'
