import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import type { PassengerVehicle } from '../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'
import { PassengerVehiclesMediatorService } from '../back-end-api/passenger-vehicles/passenger-vehicles-mediator.service'

export const usePassengerVehiclesStore = defineStore('passenger-vehicles', (): PassengerVehiclesStoreAPI => {
  const _vehicleID = ref(0)
  const _vehiclesMap = new Map<VehicleID, PassengerVehicle>()

  // # Init

  _initStore()

  // # API

  const list = ref<VehiclesList>([])

  function read(vehicleID: VehicleID): PassengerVehicle | null {
    return _vehiclesMap.get(vehicleID) ?? null
  }

  return {
    list,
    read,
  }

  // # Private logic

  function _addItemToMapOnly(vehicle: PassengerVehicle): void {
    _vehiclesMap.set(vehicle.id, vehicle)
    _vehicleID.value = Math.max(_vehicleID.value, vehicle.id)
  }

  function _addItemsToMap(vehicles: VehiclesList): void {
    vehicles.forEach((vehicle: PassengerVehicle): void => {
      _addItemToMapOnly(vehicle)
    })
    list.value = _mapToArray(_vehiclesMap)
  }

  function _initStore(): void {
    const passengerVehiclesMediatorService = new PassengerVehiclesMediatorService()
    passengerVehiclesMediatorService.readList().then((list: VehiclesList): void => {
      _addItemsToMap(list)
    })
  }

  function _mapToArray(map: VehiclesMap): VehiclesList {
    return Array.from(map.values())
  }
})

interface PassengerVehiclesStoreAPI {
  readonly list: Ref<VehiclesList>
  readonly read: (vehicleID: VehicleID) => PassengerVehicle | null
}

type VehicleID = PassengerVehicle['id']
type VehiclesList = readonly PassengerVehicle[]
type VehiclesMap = ReadonlyMap<VehicleID, PassengerVehicle>
