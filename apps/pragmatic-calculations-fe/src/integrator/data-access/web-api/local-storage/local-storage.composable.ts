import { type ShallowRef, shallowRef } from 'vue'

export function useLocalStorage<TData>(key: string, initialValue: TData): UseLocalStorageResult<TData> {
  const _readValue = (key: string): TData => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as TData) : initialValue
    } catch (error) {
      // TODO: Reorganize the error.
      console.error(`Error reading \`localStorage\` key “${key}”:`, error)
      return initialValue
    }
  }

  const clear = (): void => {
    try {
      window.localStorage.clear()
    } catch (error) {
      // TODO: Reorganize the error.
      console.error(`Error clearing \`localStorage\``, error)
    }
  }

  const removeItem = (): void => {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      // TODO: Reorganize the error.
      console.error(`Error removing \`localStorage\` item by the key “${key}”:`, error)
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

  const state = shallowRef<TData>(_readValue(key))

  // Subscribe to `localStorage` changes in other browser windows and tabs.
  window.addEventListener('storage', (event: StorageEvent): void => {
    if (event.key === key) {
      state.value = _readValue(key)
    }
  })

  const reset: () => void = (): void => writeValue(initialValue)

  return {
    clear,
    removeItem,
    // TODO: `reset` is unused.
    reset,
    state,
    writeValue,
  }
}

interface UseLocalStorageResult<TData> {
  readonly clear: () => void
  readonly removeItem: () => void
  readonly reset: () => void
  readonly state: ShallowRef<TData>
  readonly writeValue: (value: TData) => void
}
