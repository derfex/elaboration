export interface EventLocationSectionParametersForBE {
  readonly descriptionParagraphs: readonly string[]
  readonly illustrationCaptionText: string
  readonly illustrationImageAltText: string
  readonly illustrationImageHeight: number
  readonly illustrationImageRelativeURL: string
  readonly illustrationImageWidth: number
  readonly locationURL: string
  readonly ornament: EventLocationSectionParametersOrnamentForBE
  readonly showMapButtonText: string
  readonly titleText: string
  readonly transferParagraphs: readonly string[]
}

export interface EventLocationSectionParametersOrnamentForBE {
  readonly columnMinWidth: number
  readonly count: number
  readonly fontSize: number
  readonly text: string
}
