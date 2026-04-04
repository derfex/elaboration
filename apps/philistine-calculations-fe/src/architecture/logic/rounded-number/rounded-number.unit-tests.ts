import { calculateRoundedNumberParts } from './rounded-number'

const check = (
  number: number,
  afterPointEssentialCount: number,
  afterPointMinorCount: number,
  resultEssential: string,
  resultMinor: string,
): void => {
  const result = calculateRoundedNumberParts(number, afterPointEssentialCount, afterPointMinorCount)
  const condition = result.essential === resultEssential && result.minor === resultMinor
  console.assert(condition, {
    afterPointEssentialCount,
    afterPointMinorCount,
    number,
    result,
    resultEssential,
    resultMinor,
  })
}

export function checkAll(): void {
  check(0, 2, 4, '0.00', '0000')
  check(0.1, 2, 4, '0.10', '0000')
  check(-0.1, 2, 4, '–0.10', '0000')
  check(0.01, 2, 4, '0.01', '0000')
  check(-0.01, 2, 4, '–0.01', '0000')
  check(0.001, 2, 4, '0.00', '1000')
  check(-0.001, 2, 4, '–0.00', '1000')
  check(10, 2, 4, '10.00', '0000')
  check(-10, 2, 4, '–10.00', '0000')
  // 10 / 101
  check(0.09900990099009901, 2, 4, '0.09', '9010')
  check(365, 0, 0, '365', '')
}
