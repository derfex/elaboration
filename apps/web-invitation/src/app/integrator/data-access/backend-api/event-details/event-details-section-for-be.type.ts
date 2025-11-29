export interface EventDetailsSectionParametersForBE {
  readonly descriptionParagraphs: readonly string[]
  readonly titleText: string
  readonly wishes: readonly EventDetailsSectionParametersWishForBE[]
}

export interface EventDetailsSectionParametersWishForBE {
  readonly iconImageRelativeURL?: string
  readonly text: string
}
