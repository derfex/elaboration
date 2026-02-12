import type { PassengerVehicleForDataTable } from '../../../ui/passenger-vehicles/passenger-vehicles-for-data-table.type'
import type { PassengerVehicleForBE } from './passenger-vehicles-for-be.type'

export class PassengerVehiclesMediatorService {
  public readList(): Promise<readonly PassengerVehicleForDataTable[]> {
    const listForBE = [] as const satisfies readonly PassengerVehicleForBE[]
    const list: readonly PassengerVehicleForDataTable[] = listForBE.map(
      ({ color, id, model, name, price, year }: PassengerVehicleForBE) => ({
        color,
        id,
        model,
        name,
        price,
        year,
      }),
    )
    return new Promise((resolve): void => {
      resolve(list)
    })
  }
}
