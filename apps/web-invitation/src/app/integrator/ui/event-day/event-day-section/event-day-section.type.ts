export interface EventDaySectionParameters {
  readonly appealText: string
  readonly authorsSignatureLines: readonly string[]
  readonly eventDateCaptionText: string
  readonly eventDateValueText: string
  readonly ornament: EventDaySectionParametersOrnament
  readonly titleText: string
}

export interface EventDaySectionParametersOrnament {
  readonly columnMinWidth: number
  readonly count: number
  readonly fontSize: number
  readonly text: string
}
