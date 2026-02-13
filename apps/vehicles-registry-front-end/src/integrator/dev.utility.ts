export class DevUtility {
  static readonly #vehiclesRegistryLogPrefix = '[Vehicles registry app dev]'

  static collapsedTable(
    ...groupOptionalParameters: readonly unknown[]
  ): (tabularData: unknown, columns?: readonly string[]) => void {
    return (tabularData: unknown, columns?: readonly string[]): void => {
      console.groupCollapsed(this.#vehiclesRegistryLogPrefix, ...groupOptionalParameters)
      console.table(tabularData, columns as string[])
      console.groupEnd()
    }
  }

  static info(...optionalParameters: readonly unknown[]): void {
    console.info(this.#vehiclesRegistryLogPrefix, ...optionalParameters)
  }
}
