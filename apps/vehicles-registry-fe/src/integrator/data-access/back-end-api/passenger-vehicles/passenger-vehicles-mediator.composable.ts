import { computed, type ComputedRef } from 'vue'
import type { PassengerVehicle } from '../../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'
import { usePassengerVehiclesForBEFromControlledSource } from './passenger-vehicles-for-be-from-controlled-source.composable'
import { usePassengerVehiclesForBEFromPrioritySource } from './passenger-vehicles-for-be-from-priority-source.composable'
import { usePassengerVehiclesFromLocalSource } from './passenger-vehicles-from-local-source.composable'
import { convertToPassengerVehicles } from './passenger-vehicles.utility'

export function usePassengerVehiclesMediator(): UsePassengerVehiclesMediatorResult {
  // FIXME: How to implement a lazy way?
  const _controlledSource = usePassengerVehiclesForBEFromControlledSource()
  const _prioritySource = usePassengerVehiclesForBEFromPrioritySource()

  // # API

  const error = computed<Error | null>(() => _prioritySource.error.value)
  const list = computed<Vehicles>(() => _fetchList())
  const loading = computed<boolean>(() => _prioritySource.loading.value)

  return {
    error,
    list,
    loading,
  }

  // # Private logic

  function _fetchList(): Vehicles {
    if (!_prioritySource.error.value) {
      return convertToPassengerVehicles(_prioritySource.list.value)
    }

    if (!_controlledSource.error.value) {
      return convertToPassengerVehicles(_controlledSource.list.value)
    }

    const { list } = usePassengerVehiclesFromLocalSource()
    return list.value
  }
}

interface UsePassengerVehiclesMediatorResult {
  readonly list: ComputedRef<Vehicles>
  readonly error: ComputedRef<Error | null>
  readonly loading: ComputedRef<boolean>
}
type Vehicles = readonly PassengerVehicle[]
