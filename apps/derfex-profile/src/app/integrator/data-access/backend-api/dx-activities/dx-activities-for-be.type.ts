// Expected string format for `periodFrom` and `periodTo`: 'YYYY-MM'.
export interface DXActivityForBE {
  readonly achievements: readonly string[]
  readonly codename: string
  readonly periodFrom: string
  readonly periodTo: string | null
  readonly role: string
  readonly shortDescription: string
  readonly skillCodenames: readonly string[]
}

export interface DXActivitiesSectionParametersForBE {
  readonly descriptionText: string
  readonly list: {
    readonly emptyStateText: string
    readonly item: {
      readonly achievementsTitleText: string
      readonly skillsTitleText: string
    }
    readonly query: {
      readonly skills: {
        readonly sourceRelativeURL: string
      }
    }
    readonly sourceRelativeURL: string
  }
  readonly titleText: string
}
