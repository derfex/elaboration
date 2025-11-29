export interface EventLocationSectionParametersForBE {
  readonly illustrationCaptionText: string
  readonly illustrationImageAltText: string
  readonly illustrationImageHeight: number
  readonly illustrationImageRelativeURL: string
  readonly illustrationImageWidth: number
  readonly locationURL: string
  readonly mapDescriptionParagraphs: readonly string[]
  readonly ornament: EventLocationSectionParametersOrnamentForBE
  readonly showMapButtonText: string
  readonly titleText: string
  readonly transferParagraphs: readonly string[]
}

// Expected value for `count`: a non-negative integer.
interface EventLocationSectionParametersOrnamentForBE {
  readonly columnMinWidth: number
  readonly count: number
  readonly fontSize: number
  readonly text: string
}
