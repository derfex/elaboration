export interface DXSkillForBE {
  readonly codename: string
  readonly name: string
  readonly proficiencyLevelDescription: string
  readonly proficiencyLevelListItems: readonly string[]
  readonly referenceCaption: string
  readonly referenceURL: string
  readonly shortDescription: string
}

export interface DXSkillsSectionParametersForBE {
  readonly descriptionText: string
  readonly details: {
    readonly minHeight: {
      readonly forDeviceWidthExtraSmall: number
      readonly forDeviceWidthLarge: number
    }
  }
  readonly list: {
    readonly emptyStateText: string
    readonly sourceRelativeURL: string
  }
  readonly titleText: string
}
