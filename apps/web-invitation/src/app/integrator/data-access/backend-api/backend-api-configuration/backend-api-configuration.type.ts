export interface BackendAPIConfigurationForBE {
  readonly eventDetailsSectionRelativeURL: string
}

export type BackendAPIRelativeURLCodenameForBE = keyof BackendAPIConfigurationForBE

export type BackendAPIURLCodename =
  | 'sections/eventDetails'
  | 'sections/eventOrganization'
  | 'sections/eventProgram'
