export interface DXActivityCompiledForBE {
  readonly achievements: readonly string[]
  readonly codename: string
  readonly period: string
  // TODO: Do we need `periodFrom` and `periodTo` for sorting?
  // readonly periodFrom: number
  // readonly periodTo: number | null
  readonly role: string
  readonly shortDescription: string
  readonly skills: readonly string[]
}

export interface DXActivitiesCompiledSectionParametersForBE {
  readonly descriptionText: string
  readonly list: {
    readonly emptyStateText: string
    readonly item: {
      readonly achievementsTitleText: string
      readonly skillsTitleText: string
    }
    readonly sourceRelativeURL: string
  }
  readonly titleText: string
}
