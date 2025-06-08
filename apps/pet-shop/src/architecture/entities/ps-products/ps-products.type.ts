export interface PSProduct {
  readonly category: {
    readonly id: number
    readonly name: string
  }
  readonly id: number
  // TODO: Do we need `lastChange`?
  // readonly lastChange: string
  readonly name: string
  readonly price: number
}
