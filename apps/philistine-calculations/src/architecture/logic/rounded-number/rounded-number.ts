export interface RoundedNumberParts {
  readonly essential: string
  readonly minor: string
}

export function calculateRoundedNumberParts(
  number: number,
  afterPointEssentialCount: number,
  afterPointMinorCount: number,
): RoundedNumberParts {
  const point = '.'
  const minus = '–'
  // if (number === 0) {
  //   const essential = `0${point}${'0'.repeat(afterPointEssentialCount)}`
  //   const minor = '0'.repeat(afterPointMinorCount)
  //   return { essential, minor }
  // }
  const wholeSign = number >= 0 ? '' : minus
  const absValue = Math.abs(number)
  const afterPointCount = afterPointEssentialCount + afterPointMinorCount
  const coefficient = 10 ** afterPointCount
  const roundedAbsValueAsString = '' + Math.round(absValue * coefficient)
  const wholeMinCount = 1
  const text = roundedAbsValueAsString.padStart(wholeMinCount + afterPointCount, '0')
  const wholeCount = text.length - afterPointCount
  const whole = text.substring(0, wholeCount)
  // console.log({ number, text, wholeCount })
  const minorStart = text.length - afterPointMinorCount
  const essentialAfterPoint = text.substring(wholeCount, minorStart)
  const minor = text.substring(minorStart)
  const essential = `${wholeSign}${whole}${point}${essentialAfterPoint}`
  return { essential, minor }
}
