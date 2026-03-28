import type { PassengerVehicle } from '../../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'
import type { PassengerVehicleForBE } from './passenger-vehicles-for-be.type'

export function convertToPassengerVehicles(vehiclesForBE: VehiclesForBE): Vehicles {
  return vehiclesForBE.map(convertToPassengerVehicle)
}

function convertToPassengerVehicle({
  color,
  id,
  model,
  name,
  price,
  year,
}: PassengerVehicleForBE): PassengerVehicle {
  return {
    color,
    id,
    model,
    name,
    price,
    year,
  }
}

type Vehicles = readonly PassengerVehicle[]
type VehiclesForBE = readonly PassengerVehicleForBE[]
