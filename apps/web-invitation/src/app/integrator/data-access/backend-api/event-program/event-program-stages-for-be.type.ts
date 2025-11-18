import type { EventProgramStageCodename } from '~entities/event-program-stages/event-program-stages.type'

export interface EventProgramStageForBE {
  readonly codename: EventProgramStageCodename
  readonly descriptionParagraphList: readonly string[]
  readonly periodFrom: string
  readonly title: string
}

export interface EventProgramSectionParametersForBE {
  readonly list: {
    readonly emptyStateText: string
    readonly sourceRelativeURL: string
  }
  readonly titleText: string
}
