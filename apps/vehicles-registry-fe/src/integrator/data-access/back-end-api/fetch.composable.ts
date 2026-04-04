import { computed, type ComputedRef, shallowRef } from 'vue'

export function useFetch<TData, TError>(url: string, initialValue: TData): UseFetchResult<TData, TError> {
  const _data = shallowRef<TData>(initialValue)
  const _error = shallowRef<TError | null>(null)
  const _loading = shallowRef(true)

  fetch(url)
    .then((res: Response): Promise<TData> => res.json())
    .then((dataValue: TData): TData => (_data.value = dataValue))
    .catch((err: TError): TError => (_error.value = err))
    .finally((): void => {
      _loading.value = false
    })

  // # API

  const data = computed<TData>(() => _data.value)
  const error = computed<TError | null>(() => _error.value)
  const loading = computed(() => _loading.value)

  return { data, error, loading }
}

interface UseFetchResult<TData, TError> {
  readonly data: ComputedRef<TData>
  readonly error: ComputedRef<TError | null>
  readonly loading: ComputedRef<boolean>
}
