import type { DXSkillsListItem } from '~ui/dx-skills/dx-skills/dx-skills.type'

export interface DXSkillsSectionParameters {
  readonly descriptionText: string
  readonly details: {
    readonly minHeight: {
      readonly forDeviceWidthExtraSmall: number
      readonly forDeviceWidthLarge: number
    }
  }
  readonly list: {
    readonly descriptionText: string
    readonly emptyStateText: string
  }
  readonly titleText: string
}

export interface DXSkillsSectionParametersAndList {
  readonly list: readonly DXSkillsListItem[]
  readonly sectionParameters: DXSkillsSectionParameters
}
