import type { Brand } from '../../brand-type.util'

export interface EventProgramStage {
  readonly codename: EventProgramStageCodename
  readonly descriptionParagraphList: readonly string[]
  readonly periodFrom: string
  readonly title: string
}

export type EventProgramStageCodename = Brand<string, 'event item codename'>
