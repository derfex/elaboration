export function checkIfBargainReportItemIsCommodity(item: BargainReportItem): item is BargainReportCommodityItem {
  return item.kind === 'commodity'
}

export interface BargainReportCommodity {
  readonly comment: string
  readonly costPer1000Units: number
  readonly costPerUnit: number
  readonly packageSize: number
  readonly price: number
}

export type BargainReportItem = BargainReportCommodityItem | BargainReportSyntaxErrorItem
export type BargainReportList = readonly BargainReportItem[]

interface BargainReportCommodityItem {
  readonly id: number
  readonly kind: 'commodity'
  readonly report: BargainReportCommodity
}

interface BargainReportSyntaxErrorItem {
  readonly id: number
  readonly kind: 'syntaxError'
  readonly report: string
}
