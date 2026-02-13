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

  const create = _createItem
  const read =_readItem

  return {
    create,
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
    _syncList()
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

  function _syncList(): void {
    list.value = _mapToArray(_vehiclesMap)
  }

  // ## C. R. U. D.

  function _createItem({ color, model, name, price, year }: VehicleForCreate): void {
    const id = ++_vehicleID.value
    _vehiclesMap.set(id, {
      color,
      id,
      model,
      name,
      price,
      year,
    })
    _syncList()
  }

  function _readItem(vehicleID: VehicleID): PassengerVehicle | null {
    return _vehiclesMap.get(vehicleID) ?? null
  }
})

interface PassengerVehiclesStoreAPI {
  readonly create: (vehicleForCreate: VehicleForCreate) => void
  readonly list: Ref<VehiclesList>
  readonly read: (vehicleID: VehicleID) => PassengerVehicle | null
}

type VehicleForCreate = Omit<PassengerVehicle, 'id'>
type VehicleID = PassengerVehicle['id']
type VehiclesList = readonly PassengerVehicle[]
type VehiclesMap = ReadonlyMap<VehicleID, PassengerVehicle>
