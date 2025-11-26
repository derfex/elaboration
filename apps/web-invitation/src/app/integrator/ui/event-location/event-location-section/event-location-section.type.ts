export interface EventLocationSectionParameters {
  readonly descriptionParagraphs: readonly string[]
  readonly illustrationCaptionText: string
  readonly illustrationImageAltText: string
  readonly illustrationImageHeight: number
  readonly illustrationImageURL: string
  readonly illustrationImageWidth: number
  readonly locationURL: string
  readonly ornament: EventLocationSectionParametersOrnament
  readonly titleText: string
  readonly transferParagraphs: readonly string[]
}

export interface EventLocationSectionParametersOrnament {
  readonly columnMinWidth: number
  readonly count: number
  readonly fontSize: number
  readonly text: string
}
