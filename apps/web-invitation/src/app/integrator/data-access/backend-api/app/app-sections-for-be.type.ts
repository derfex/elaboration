export interface AppSectionsParametersForBE {
  readonly footer: AppFooterSectionParametersForBE
  readonly hero: AppHeroSectionParametersForBE
}


interface AppFooterSectionParametersForBE {
  readonly carefullyCraftedWithText: string
}

interface AppHeroSectionParametersForBE {
  readonly appealText: string
  readonly authorsSignatureLines: readonly string[]
  readonly eventDateCaptionText: string
  readonly eventDateValueText: string
  readonly titleText: string
}
