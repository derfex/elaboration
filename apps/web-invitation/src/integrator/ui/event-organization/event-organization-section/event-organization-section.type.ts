import type { EventOrganizationContact } from '~ui/event-organization/event-organization/event-organization.type'

export interface EventOrganizationSectionParameters {
  readonly contacts: readonly EventOrganizationContact[]
  readonly descriptionParagraphs: readonly string[]
  readonly titleText: string
}
