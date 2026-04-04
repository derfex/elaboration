export interface DXProjectForBE {
  readonly codename: string
  readonly name: string
  readonly resultURL: string
  readonly sourceURL: string
}

export interface DXProjectsSectionParametersForBE {
  readonly descriptionText: string
  readonly list: {
    readonly emptyStateText: string
    readonly item: {
      readonly resultTitleText: string
      readonly sourceCodeTitleText: string
    }
    readonly sourceRelativeURL: string
  }
  readonly titleText: string
}
