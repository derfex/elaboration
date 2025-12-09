export interface AppSectionsParametersForBE {
  readonly footer: AppFooterSectionParametersForBE
  readonly hero: AppHeroSectionParametersForBE
}


interface AppFooterSectionParametersForBE {
  readonly appealText: string
  readonly copyrightText: string
  readonly craftedWithText: string
}

interface AppHeroSectionParametersForBE {
  readonly illustrationImageAltText: string
  readonly illustrationImageHeight: number
  readonly illustrationImageRelativeURL: string
  readonly illustrationImageWidth: number
  readonly phraseText: string
}
