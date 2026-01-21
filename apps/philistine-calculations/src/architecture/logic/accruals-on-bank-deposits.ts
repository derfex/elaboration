export function calculateAccrual(
  amountAtBeginningOfPeriod: number,
  numberOfDaysInPeriod: number,
  rate: number,
  numberOfDaysOfYear: number,
): number {
  return (amountAtBeginningOfPeriod * numberOfDaysInPeriod * rate) / 100 / numberOfDaysOfYear
}
