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
  readonly kind: 'commodity'
  readonly report: BargainReportCommodity
  readonly sequentialNumber: number
}

export interface BargainReportRangeErrorItem {
  readonly kind: 'rangeError'
  readonly report: string
  readonly sequentialNumber: number
}

export interface BargainReportSyntaxErrorItem {
  readonly kind: 'syntaxError'
  readonly report: string
  readonly sequentialNumber: number
}

export type BargainReportItem = BargainReportCommodityItem | BargainReportRangeErrorItem | BargainReportSyntaxErrorItem
export type BargainReportList = readonly BargainReportItem[]

