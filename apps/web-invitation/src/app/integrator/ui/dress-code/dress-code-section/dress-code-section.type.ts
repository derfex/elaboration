export interface DressCodeSectionParameters {
  readonly descriptionParagraphs: readonly string[]
  readonly illustration: DressCodeSectionParametersIllustration
  readonly tints: readonly string[]
  readonly titleText: string
}

export interface DressCodeSectionParametersIllustration {
  readonly imageAltText: string
  readonly imageHeight: number
  readonly imageURL: string
  readonly imageWidth: number
}
