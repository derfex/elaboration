export function parseCommoditiesNotes(notes: string): ParseCommoditiesReport {
  const commodities: ParseCommoditiesReportCommodity[] = []
  const range: ParseCommoditiesReportError[] = []
  const syntax: ParseCommoditiesReportError[] = []
  notes.split('\n').forEach((note: string, index: number): void => {
    const parsed = parseNoteToCommodity(note)
    if (parsed) {
      commodities.push({
        parsed,
        sequentialNumber: index + 1,
      })
    } else {
      syntax.push({
        note,
        sequentialNumber: index + 1,
      })
    }
  })
  return { commodities, errors: { range, syntax } }
}

export interface ParsedCommodityNote {
  readonly comment: string
  readonly packageSize: number
  readonly price: number
}

export interface ParseCommoditiesReport {
  readonly commodities: readonly ParseCommoditiesReportCommodity[]
  readonly errors: {
    readonly range: readonly ParseCommoditiesReportError[]
    readonly syntax: readonly ParseCommoditiesReportError[]
  }
}


function parseNoteToCommodity(note: string): ParsedCommodityNote | null {
  let index = 0
  let priceText = ''
  for (; index < note.length; index++) {
    const symbol = note[index]
    if (symbol === ' ') {
      if (priceText.length) break
      else continue
    }
    if (symbol === ',') {
      priceText += '.'
      continue
    }
    priceText += symbol
  }
  const price = parseFloat(priceText)
  if (Number.isNaN(price)) {
    return null
  }
  let packageSizeText = ''
  for (; index < note.length; index++) {
    const symbol = note[index]
    if (symbol === ' ') {
      if (packageSizeText.length) break
      else continue
    }
    if (symbol === ',') {
      packageSizeText += '.'
      continue
    }
    packageSizeText += symbol
  }
  const packageSize = parseFloat(packageSizeText)
  if (Number.isNaN(packageSize)) {
    return null
  }
  const comment = note.slice(index + 1).trim()
  return {
    comment,
    packageSize,
    price,
  }
}

interface ParseCommoditiesReportCommodity {
  readonly parsed: ParsedCommodityNote
  readonly sequentialNumber: number
}

interface ParseCommoditiesReportError {
  readonly note: string
  readonly sequentialNumber: number
}
