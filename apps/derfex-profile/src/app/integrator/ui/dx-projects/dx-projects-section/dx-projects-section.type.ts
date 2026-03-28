import type { DXProjectsListItem } from '~ui/dx-projects/dx-projects/dx-projects.type'

export interface DXProjectsSectionParameters {
  readonly descriptionText: string
  readonly list: {
    readonly emptyStateText: string
    readonly item: {
      readonly resultTitleText: string
      readonly sourceCodeTitleText: string
    }
  }
  readonly titleText: string
}

export interface DXProjectsSectionParametersAndList {
  readonly list: readonly DXProjectsListItem[]
  readonly sectionParameters: DXProjectsSectionParameters
}
