import { defineStore } from 'pinia'
import { computed, type ComputedRef, shallowRef } from 'vue'
import type { PassengerVehicle } from '../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'
import { assertDefined } from '../../dev/dev-error.utility'
import type { PassengerVehicleForCreate } from '../../ui/passenger-vehicles/passenger-vehicles-for-create.type'
import type { PassengerVehicleForUpdate } from '../../ui/passenger-vehicles/passenger-vehicles-for-details.type'
import { PassengerVehiclesMediatorService } from '../back-end-api/passenger-vehicles/passenger-vehicles-mediator.service'

export const usePassengerVehiclesStore = defineStore('passenger-vehicles', (): PassengerVehiclesStoreAPI => {
  const _list = shallowRef<VehiclesList>([])
  const _loading = shallowRef(false)
  let _vehicleID = 0
  const _vehiclesMap = new Map<VehicleID, PassengerVehicle>()

  // # API

  const list = computed<VehiclesList>(() => _list.value)
  const loading = computed<boolean>(() => _loading.value)

  const create = _createItem
  const deleteFn = _deleteItemAsPromise
  const read = _readItemAsPromise
  const update = _updateItemAsPromise

  // # Init

  _initStore()

  return {
    create,
    delete: deleteFn,
    list,
    loading,
    read,
    update,
  }

  // # Private logic

  function _addItemToMapOnly(vehicle: PassengerVehicle): void {
    _vehiclesMap.set(vehicle.id, vehicle)
    _vehicleID = Math.max(_vehicleID, vehicle.id)
  }

  function _addItemsToMap(vehicles: VehiclesList): void {
    vehicles.forEach((vehicle: PassengerVehicle): void => {
      _addItemToMapOnly(vehicle)
    })
    _syncList()
  }

  function _initStore(): void {
    const passengerVehiclesMediatorService = new PassengerVehiclesMediatorService()
    _loading.value = true
    passengerVehiclesMediatorService.readList().then((list: VehiclesList): void => {
      _addItemsToMap(list)
      _loading.value = false
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
    _list.value = _mapToArray(_vehiclesMap)
  }

  // ## C. R. U. D.

  function _createItem({ color, model, name, price, year }: VehicleForCreate): void {
    const id = ++_vehicleID
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

  function _deleteItem(vehicleID: VehicleID): void {
    _vehiclesMap.delete(vehicleID)
  }

  function _deleteItemAsPromise(vehicleID: VehicleID): Promise<void> {
    _deleteItem(vehicleID)
    _syncList()
    return _valueToPromise(undefined)
  }

  function _readItem(vehicleID: VehicleID): PassengerVehicle {
    const vehicle = _vehiclesMap.get(vehicleID)
    assertDefined(vehicle, `Wrong data. The vehicle ID ('${vehicleID}') does not exist.`)
    return vehicle
  }

  function _readItemAsPromise(vehicleID: VehicleID): Promise<PassengerVehicle> {
    _loading.value = true
    return _valueToPromise(_readItem(vehicleID)).then((vehicle: PassengerVehicle): PassengerVehicle => {
      _loading.value = false
      return vehicle
    })
  }

  function _updateItem(vehicleID: VehicleID, { name, price }: VehicleForUpdate): void {
    const vehicleOld = _vehiclesMap.get(vehicleID)
    assertDefined(vehicleOld, `Wrong data. The vehicle ID ('${vehicleID}') does not exist.`)
    const { color, id, model, year } = vehicleOld
    _vehiclesMap.set(id, { color, id, model, name, price, year })
  }

  function _updateItemAsPromise(vehicleID: VehicleID, parameters: VehicleForUpdate): Promise<void> {
    _updateItem(vehicleID, parameters)
    _syncList()
    return _valueToPromise(undefined)
  }
})

interface PassengerVehiclesStoreAPI {
  readonly create: (vehicleForCreate: VehicleForCreate) => void
  readonly delete: (vehicleID: VehicleID) => Promise<void>
  readonly list: ComputedRef<VehiclesList>
  readonly loading: ComputedRef<boolean>
  readonly read: (vehicleID: VehicleID) => Promise<PassengerVehicle>
  readonly update: (vehicleID: VehicleID, parameters: VehicleForUpdate) => Promise<void>
}

type VehicleForCreate = PassengerVehicleForCreate
type VehicleForUpdate = PassengerVehicleForUpdate
type VehicleID = PassengerVehicle['id']
type VehiclesList = readonly PassengerVehicle[]
type VehiclesMap = ReadonlyMap<VehicleID, PassengerVehicle>
