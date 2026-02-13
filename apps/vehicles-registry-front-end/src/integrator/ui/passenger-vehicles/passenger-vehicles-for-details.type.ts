import type { PassengerVehicle } from '../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'

export interface PassengerVehicleForDetails {
  readonly id: PassengerVehicle['id']
  readonly model: PassengerVehicle['model']
  readonly name: PassengerVehicle['name']
  readonly price: PassengerVehicle['price']
  readonly year: PassengerVehicle['year']
}
