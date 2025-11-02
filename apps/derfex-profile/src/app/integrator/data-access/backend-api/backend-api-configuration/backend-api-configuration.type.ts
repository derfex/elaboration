export interface BackendAPIConfigurationForBE {
  readonly dxActivitiesSectionCompiledRelativeURL: string
  readonly dxActivitiesSectionRelativeURL: string
  readonly dxProjectsSectionRelativeURL: string
  readonly dxSkillsSectionRelativeURL: string
  readonly heroSectionRelativeURL: string
}

export type BackendAPIRelativeURLCodenameForBE = keyof BackendAPIConfigurationForBE

export type BackendAPIURLCodename =
  | 'compiled/dxActivities/section'
  | 'sections/dxActivities'
  | 'sections/dxProjects'
  | 'sections/dxSkills'
  | 'sections/hero'
