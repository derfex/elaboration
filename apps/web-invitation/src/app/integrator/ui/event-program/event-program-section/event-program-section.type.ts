import type { EventProgramStagesListItem } from '~ui/event-program/event-program/event-program.type'

export interface EventProgramSectionParameters {
  readonly titleText: string
}

export interface EventProgramSectionParametersAndList {
  readonly list: readonly EventProgramStagesListItem[]
  readonly sectionParameters: EventProgramSectionParameters
}
