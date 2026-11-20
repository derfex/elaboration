import { type ShallowRef, shallowRef } from 'vue'

export function useLocalStorage<TData>(key: string, initialValue: TData): UseLocalStorageResult<TData> {
  const readValue = (key: string): TData => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as TData) : initialValue
    } catch (error) {
      // TODO: Reorganize the error.
      console.error(`Error reading \`localStorage\` key “${key}”:`, error)
      return initialValue
    }
  }

  const writeValue = (value: TData): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // TODO: Reorganize the error.
      console.error(`Error writing \`localStorage\` key “${key}”:`, error)
    }
  }

  const state = shallowRef<TData>(readValue(key))

  // Subscribe to `localStorage` changes in other browser windows and tabs.
  window.addEventListener('storage', (event): void => {
    if (event.key === key) {
      state.value = readValue(key)
    }
  })

  const reset: () => void = (): void => writeValue(initialValue)

  return {
    reset,
    state,
    writeValue,
  }
}

interface UseLocalStorageResult<TData> {
  readonly reset: () => void
  readonly state: ShallowRef<TData>
  readonly writeValue: (value: TData) => void
}
