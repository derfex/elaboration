export interface BackendAPIConfigurationForBE {
  readonly eventDaySectionRelativeURL: string
  readonly eventDetailsSectionRelativeURL: string
}

export type BackendAPIRelativeURLCodenameForBE = keyof BackendAPIConfigurationForBE

export type BackendAPIURLCodename =
  | 'sections/eventDay'
  | 'sections/eventDetails'
  | 'sections/eventOrganization'
  | 'sections/eventProgram'
