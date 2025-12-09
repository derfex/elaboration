export interface EventOrganizationSectionParametersForBE {
  readonly contacts: readonly EventOrganizationContactForBE[]
  readonly descriptionParagraphs: readonly string[]
  readonly titleText: string
}

interface EventOrganizationContactForBE {
  readonly hRef: string
  readonly titleText: string
}
