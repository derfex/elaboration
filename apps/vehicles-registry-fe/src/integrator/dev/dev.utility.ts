export const devPrefix = '[Elaboration. Vehicles registry app dev]'

export class DevUtility {
  static collapsedTable(
    ...groupOptionalParameters: readonly unknown[]
  ): (tabularData: unknown, columns?: readonly string[]) => void {
    return (tabularData: unknown, columns?: readonly string[]): void => {
      console.groupCollapsed(devPrefix, ...groupOptionalParameters)
      console.table(tabularData, columns as string[])
      console.groupEnd()
    }
  }

  static info(...optionalParameters: readonly unknown[]): void {
    console.info(devPrefix, ...optionalParameters)
  }
}
