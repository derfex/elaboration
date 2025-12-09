export interface DressCodeSectionParametersForBE {
  readonly descriptionParagraphs: readonly string[]
  readonly illustration: DressCodeSectionParametersIllustrationForBE
  readonly tints: readonly string[]
  readonly titleText: string
}

interface DressCodeSectionParametersIllustrationForBE {
  readonly imageAltText: string
  readonly imageHeight: number
  readonly imageRelativeURL: string
  readonly imageWidth: number
}
