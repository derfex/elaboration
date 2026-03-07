import { computed, type ComputedRef } from 'vue'
import type { PassengerVehicle } from '../../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'
import { usePassengerVehiclesForBEFromPrioritySource } from './passenger-vehicles-for-be-from-priority-source.composable'
import { usePassengerVehiclesFromLocalSource } from './passenger-vehicles-from-local-source.composable'
import { convertToPassengerVehicles } from './passenger-vehicles.utility'

export function usePassengerVehiclesMediator(): UsePassengerVehiclesMediatorResult {
  const _prioritySource = usePassengerVehiclesForBEFromPrioritySource()

  // # API

  const error = computed<Error | null>(() => _prioritySource.error.value)
  const list = computed<Vehicles>((): Vehicles => {
    if (!_prioritySource.error.value) {
      return convertToPassengerVehicles(_prioritySource.list.value)
    }

    const { list } = usePassengerVehiclesFromLocalSource()
    return list.value
  })
  const loading = computed<boolean>(() => _prioritySource.loading.value)

  return {
    error,
    list,
    loading,
  }
}

interface UsePassengerVehiclesMediatorResult {
  readonly list: ComputedRef<Vehicles>
  readonly error: ComputedRef<Error | null>
  readonly loading: ComputedRef<boolean>
}
type Vehicles = readonly PassengerVehicle[]
