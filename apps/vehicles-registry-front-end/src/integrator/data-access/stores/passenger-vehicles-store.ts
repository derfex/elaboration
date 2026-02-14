import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import type { PassengerVehicle } from '../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'
import { assertDefined } from '../../dev/dev-error.utility'
import { PassengerVehiclesMediatorService } from '../back-end-api/passenger-vehicles/passenger-vehicles-mediator.service'

export const usePassengerVehiclesStore = defineStore('passenger-vehicles', (): PassengerVehiclesStoreAPI => {
  const _vehicleID = ref(0)
  const _vehiclesMap = new Map<VehicleID, PassengerVehicle>()

  // # Init

  _initStore()

  // # API

  const list = ref<VehiclesList>([])

  const create = _createItem
  const read = _readItemAsPromise

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

  function _valueToPromise<Type>(value: Type): Promise<Type> {
    return new Promise((resolve): void => {
      resolve(value)
    })
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

  function _readItem(vehicleID: VehicleID): PassengerVehicle {
    const vehicle = _vehiclesMap.get(vehicleID)
    assertDefined(vehicle, `Wrong data. The vehicle ID ('${vehicleID}') does not exist.`)
    return vehicle
  }

  function _readItemAsPromise(vehicleID: VehicleID): Promise<PassengerVehicle> {
    return _valueToPromise(_readItem(vehicleID))
  }
})

interface PassengerVehiclesStoreAPI {
  readonly create: (vehicleForCreate: VehicleForCreate) => void
  readonly list: Ref<VehiclesList>
  readonly read: (vehicleID: VehicleID) => Promise<PassengerVehicle>
}

type VehicleForCreate = Omit<PassengerVehicle, 'id'>
type VehicleID = PassengerVehicle['id']
type VehiclesList = readonly PassengerVehicle[]
type VehiclesMap = ReadonlyMap<VehicleID, PassengerVehicle>
