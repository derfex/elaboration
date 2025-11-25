export interface BackendAPIConfigurationForBE {
  readonly appSectionsRelativeURL: string
  readonly eventDaySectionRelativeURL: string
  readonly eventDetailsSectionRelativeURL: string
}

export type BackendAPIRelativeURLCodenameForBE = keyof BackendAPIConfigurationForBE

export type BackendAPIURLCodename =
  | 'sections/app'
  | 'sections/eventDay'
  | 'sections/eventDetails'
  | 'sections/eventOrganization'
  | 'sections/eventProgram'
