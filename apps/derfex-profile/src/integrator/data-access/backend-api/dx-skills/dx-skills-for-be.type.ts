export interface DXSkillForBE {
  readonly codename: string
  readonly name: string
  readonly url: string
}

export interface DXSkillsSectionParametersForBE {
  readonly descriptionText: string
  readonly list: {
    readonly emptyStateText: string
    readonly sourceRelativeURL: string
  }
  readonly titleText: string
}
