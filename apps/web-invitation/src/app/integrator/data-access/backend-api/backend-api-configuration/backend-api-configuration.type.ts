export interface BackendAPIConfigurationForBE {
  readonly appSectionsRelativeURL: string
  readonly eventDaySectionRelativeURL: string
  readonly eventDetailsSectionRelativeURL: string
  readonly eventLocationSectionRelativeURL: string
  readonly eventProgramSectionRelativeURL: string
  readonly eventOrganizationSectionRelativeURL: string
  readonly guestQuestionnaireSectionRelativeURL: string
}

export type BackendAPIRelativeURLCodenameForBE = keyof BackendAPIConfigurationForBE

export type BackendAPIURLCodename =
  | 'sections/app'
  | 'sections/eventDay'
  | 'sections/eventDetails'
  | 'sections/eventLocation'
  | 'sections/eventOrganization'
  | 'sections/eventProgram'
  | 'sections/guestQuestionnaire'
