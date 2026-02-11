import type { PassengerVehicle } from '../../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'
import type { PassengerVehicleForBE } from './passenger-vehicles-for-be.type'

export class PassengerVehiclesMediatorService {
  public readList(): Promise<readonly PassengerVehicle[]> {
    const listForBE = [] as const satisfies readonly PassengerVehicleForBE[]
    const list: readonly PassengerVehicle[] = listForBE.map(({ color, id,  model, name, price, year }: PassengerVehicleForBE) => ({
      color,
      id,
      model,
      name,
      price,
      year,
    }))
    return new Promise((resolve): void => {
      resolve(list)
    })
  }
}
