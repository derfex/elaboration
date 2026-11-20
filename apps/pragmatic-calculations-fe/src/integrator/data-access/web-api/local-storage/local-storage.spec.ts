import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useLocalStorage } from './local-storage'

describe('useLocalStorage', (): void => {
  const testKey = 'test-key'
  const initialValue = { count: 0 }

  beforeEach((): void => {
    window.localStorage.clear()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(console, 'error').mockImplementation((): void => {})
  })

  afterEach((): void => {
    vi.restoreAllMocks()
  })

  it('should return initial value when localStorage is empty', (): void => {
    const { state } = useLocalStorage(testKey, initialValue)
    expect(state.value).toEqual(initialValue)
  })

  it('should read value from localStorage', (): void => {
    const testValue = { count: 42 }
    window.localStorage.setItem(testKey, JSON.stringify(testValue))

    const { state } = useLocalStorage(testKey, initialValue)
    expect(state.value).toEqual(testValue)
  })

  it('should write value to localStorage', (): void => {
    const { writeValue } = useLocalStorage(testKey, initialValue)
    const newValue = { count: 100 }

    writeValue(newValue)
    expect(JSON.parse(window.localStorage.getItem(testKey) || '')).toEqual(newValue)
  })

  it('should handle JSON parse errors', (): void => {
    window.localStorage.setItem(testKey, 'invalid-json')
    const { state } = useLocalStorage(testKey, initialValue)
    expect(state.value).toEqual(initialValue)
    expect(console.error).toHaveBeenCalled()
  })
})
