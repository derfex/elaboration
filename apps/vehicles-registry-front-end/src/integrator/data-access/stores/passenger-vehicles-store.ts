import { defineStore } from 'pinia'
import type { PassengerVehicle } from '../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'
import { PassengerVehiclesMediatorService } from '../back-end-api/passenger-vehicles/passenger-vehicles-mediator.service'

export const usePassengerVehiclesStore = defineStore('passenger-vehicles', {
  actions: {
    async readList(): Promise<void> {
      const passengerVehiclesMediatorService = new PassengerVehiclesMediatorService()
      this.list = await passengerVehiclesMediatorService.readList()
    },
  },
  getters: {
    map: (state) =>
      new Map<PassengerVehicle['id'], PassengerVehicle>(state.list.map((vehicle) => [vehicle.id, vehicle])),
    readByID: (): ((vehicleID: PassengerVehicle['id']) => PassengerVehicle | null) => {
      return (vehicleID: PassengerVehicle['id']): PassengerVehicle | null => {
        try {
          if (this) {
            // FIXME: “TS2532: Object is possibly `undefined`”.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return this.map.get(vehicleID) as PassengerVehicle | null
          } else {
            return null
          }
        } catch {
          return null
        }
      }
    },
  },
  state: (): PassengerVehiclesState => {
    return { list: [] }
  },
})

interface PassengerVehiclesState {
  list: readonly PassengerVehicle[]
}
