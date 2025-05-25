export interface PSProduct {
  readonly id: number
  readonly lastChange: string
  readonly name: string
  readonly parent: {
    readonly id: number
    readonly name: string
  }
  readonly price: number
}
