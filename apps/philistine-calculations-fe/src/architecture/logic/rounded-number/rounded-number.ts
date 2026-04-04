export function calculateRoundedNumberParts(
  number: number,
  afterPointEssentialCount: number,
  afterPointMinorCount: number,
): RoundedNumberParts {
  // TODO: Handle `Infinity`.
  const point = '.'
  const minus = '–'
  const wholeSign = number >= 0 ? '' : minus
  const absValue = Math.abs(number)
  const afterPointCount = afterPointEssentialCount + afterPointMinorCount
  const pointSign = afterPointCount !== 0 ? point : ''
  const coefficient = 10 ** afterPointCount
  const roundedAbsValueAsString = '' + Math.round(absValue * coefficient)
  const wholeMinCount = 1
  const text = roundedAbsValueAsString.padStart(wholeMinCount + afterPointCount, '0')
  const wholeCount = text.length - afterPointCount
  const whole = text.substring(0, wholeCount)
  const minorStart = text.length - afterPointMinorCount
  const essentialAfterPoint = text.substring(wholeCount, minorStart)
  const minor = text.substring(minorStart)
  const essential = `${wholeSign}${whole}${pointSign}${essentialAfterPoint}`
  return { essential, minor }
}


interface RoundedNumberParts {
  readonly essential: string
  readonly minor: string
}
