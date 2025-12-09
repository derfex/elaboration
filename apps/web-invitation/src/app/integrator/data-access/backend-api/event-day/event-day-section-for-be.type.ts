export interface EventDaySectionParametersForBE {
  readonly appealText: string
  readonly authorsSignatureLines: readonly string[]
  readonly eventDateCaptionText: string
  readonly eventDateValueText: string
  readonly ornament: EventDaySectionParametersOrnamentForBE
  readonly titleText: string
}

// Expected value for `count`: a non-negative integer.
interface EventDaySectionParametersOrnamentForBE {
  readonly columnMinWidth: number
  readonly count: number
  readonly fontSize: number
  readonly text: string
}
