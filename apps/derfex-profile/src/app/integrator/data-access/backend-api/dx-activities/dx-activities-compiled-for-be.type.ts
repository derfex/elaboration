export interface DXActivityCompiledForBE {
  readonly codename: string
  readonly period: string
  readonly periodFrom: number
  readonly periodTo: number | null
  readonly results: readonly string[]
  readonly role: string
  readonly shortDescription: string
  readonly skills: readonly string[]
}

export interface DXActivitiesCompiledSectionParametersForBE {
  readonly descriptionText: string
  readonly list: {
    readonly emptyStateText: string
    readonly item: {
      readonly skillsTitleText: string
    }
    readonly sourceRelativeURL: string
  }
  readonly titleText: string
}
