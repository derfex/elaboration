import type { DXActivitiesListItem } from '~ui/dx-activities/dx-activities/dx-activities.type'

export interface DXActivitiesSectionParameters {
  readonly descriptionText: string
  readonly list: {
    readonly emptyStateText: string
    readonly item: {
      readonly skillsTitleText: string
    }
  }
  readonly titleText: string
}

export interface DXActivitiesSectionParametersAndList {
  readonly list: readonly DXActivitiesListItem[]
  readonly sectionParameters: DXActivitiesSectionParameters
}
