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
  readonly phraseText: string
}
