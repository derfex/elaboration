export interface EventLocationSectionParameters {
  readonly illustrationCaptionText: string
  readonly illustrationImageAltText: string
  readonly illustrationImageHeight: number
  readonly illustrationImageURL: string
  readonly illustrationImageWidth: number
  readonly locationURL: string
  readonly mapDescriptionParagraphs: readonly string[]
  readonly ornament: EventLocationSectionParametersOrnament
  readonly showMapButtonText: string
  readonly titleText: string
  readonly transferParagraphs: readonly string[]
}

export interface EventLocationSectionParametersOrnament {
  readonly columnMinWidth: number
  readonly count: number
  readonly fontSize: number
  readonly text: string
}
