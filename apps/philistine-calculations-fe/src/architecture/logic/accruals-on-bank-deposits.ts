export function calculateAccrual(
  amountAtBeginningOfPeriod: number,
  numberOfDaysInPeriod: number,
  rate: number,
  numberOfDaysOfYear: number,
): number {
  return (amountAtBeginningOfPeriod * numberOfDaysInPeriod * rate) / 100 / numberOfDaysOfYear
}

export function checkIfCurrentYearIsLeap(): boolean {
  const year = new Date().getFullYear()
  return new Date(year, 2, 0).getDate() === 29
}
