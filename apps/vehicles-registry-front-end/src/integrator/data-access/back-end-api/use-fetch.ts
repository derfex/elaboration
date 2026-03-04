import { type ShallowRef, shallowRef } from 'vue'

export function useFetch<TData, TError>(url: string, initialValue: TData): UseFetchResult<TData, TError> {
  const data = shallowRef<TData>(initialValue)
  const error = shallowRef<TError | null>(null)
  const loading = shallowRef(true)

  fetch(url)
    .then((res: Response): Promise<TData> => res.json())
    .then((dataValue: TData): TData => (data.value = dataValue))
    .catch((err: TError): TError => (error.value = err))
    .finally((): void => {
      loading.value = false
    })

  // FIXME?: Check. Can we put a value in `data.value`?
  return { data, error, loading }
}

interface UseFetchResult<TData, TError> {
  readonly data: ShallowRef<TData>
  readonly error: ShallowRef<TError | null>
  readonly loading: ShallowRef<boolean>
}
