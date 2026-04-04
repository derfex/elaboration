import { computed, type ComputedRef } from 'vue'
import type { PassengerVehicle } from '../../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'
import type { PassengerVehicleForBE } from './passenger-vehicles-for-be.type'
import { convertToPassengerVehicles } from './passenger-vehicles.utility'

export function usePassengerVehiclesFromLocalSource(): UsePassengerVehiclesFromLocalSourceResult {
  const _listForBE = [] as const satisfies VehiclesForBE
  const _list: Vehicles = convertToPassengerVehicles(_listForBE)

  // # API

  // Note:
  // We do not need a `Ref` here. But let us do it as is.
  // We might add a random logic for updates for example.
  const list = computed<Vehicles>(() => _list)

  return {
    list,
  }
}

interface UsePassengerVehiclesFromLocalSourceResult {
  readonly list: ComputedRef<Vehicles>
}
type Vehicles = readonly PassengerVehicle[]
type VehiclesForBE = readonly PassengerVehicleForBE[]
