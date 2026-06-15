export interface DXSkillForBE {
  readonly codename: string
  readonly descriptionListItems: readonly string[]
  readonly name: string
  readonly referenceURL: string
  readonly referenceURLText: string
  readonly shortDescription: string
}

export interface DXSkillsSectionParametersForBE {
  readonly descriptionText: string
  readonly list: {
    readonly emptyStateText: string
    readonly sourceRelativeURL: string
  }
  readonly titleText: string
}
