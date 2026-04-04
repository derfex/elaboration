import { computed, type ComputedRef } from 'vue'
import { useFetch } from '../fetch.composable'
import type { PassengerVehicleForBE } from './passenger-vehicles-for-be.type'

export function usePassengerVehiclesForBEFromControlledSource(): UsePassengerVehiclesForBEFromControlledSourceResult {
  const _url = import.meta.env.VITE_CONTROLLED_SOURCE_API_URL
  const _vehiclesFetchResult = useFetch<VehiclesForBE, Error>(_url, [])

  // # API

  const error = computed<Error | null>(() => _vehiclesFetchResult.error.value)
  const list = computed<VehiclesForBE>(() => _vehiclesFetchResult.data.value)
  const loading = computed<boolean>(() => _vehiclesFetchResult.loading.value)

  return {
    error,
    list,
    loading,
  }
}

interface UsePassengerVehiclesForBEFromControlledSourceResult {
  readonly list: ComputedRef<VehiclesForBE>
  readonly error: ComputedRef<Error | null>
  readonly loading: ComputedRef<boolean>
}
type VehiclesForBE = readonly PassengerVehicleForBE[]
