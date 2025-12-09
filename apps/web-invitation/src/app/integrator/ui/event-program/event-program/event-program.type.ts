import type {
  EventProgramStage,
  EventProgramStageCodename,
} from '~entities/event-program-stages/event-program-stages.type'

export interface EventProgramStagesListItem {
  readonly codename: EventProgramStageCodename
  readonly descriptionParagraphs: EventProgramStage['descriptionParagraphs']
  readonly periodFrom: EventProgramStage['periodFrom']
  readonly title: EventProgramStage['title']
}
