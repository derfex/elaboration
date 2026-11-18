export function calculateCostPerUnit(price: number, packageSize: number): number {
  return price / packageSize
}

export function checkIfBargainReportItemIsCommodity(item: BargainReportItem): item is BargainReportCommodityItem {
  return item.kind === 'commodity'
}

export function checkIfBargainReportItemIsSyntaxError(item: BargainReportItem): item is BargainReportSyntaxErrorItem {
  return item.kind === 'syntaxError'
}

export interface BargainReportCommodity {
  readonly comment: string
  readonly costPer1000Units: number
  readonly costPerUnit: number
  readonly packageSize: number
  readonly price: number
}

export interface BargainReportCommodityItem {
  readonly id: number
  readonly kind: 'commodity'
  readonly report: BargainReportCommodity
}

export interface BargainReportRangeErrorItem {
  readonly id: number
  readonly kind: 'rangeError'
  readonly report: string
}

export interface BargainReportSyntaxErrorItem {
  readonly id: number
  readonly kind: 'syntaxError'
  readonly report: string
}

export type BargainReportItem = BargainReportCommodityItem | BargainReportRangeErrorItem | BargainReportSyntaxErrorItem
export type BargainReportList = readonly BargainReportItem[]

