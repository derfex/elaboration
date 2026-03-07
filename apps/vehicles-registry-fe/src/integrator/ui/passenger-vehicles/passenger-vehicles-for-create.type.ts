import type { PassengerVehicle } from '../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'

export interface PassengerVehicleForCreate {
  readonly color: PassengerVehicle['color']
  readonly model: PassengerVehicle['model']
  readonly name: PassengerVehicle['name']
  readonly price: PassengerVehicle['price']
  readonly year: PassengerVehicle['year']
}
