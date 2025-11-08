import { inject, InjectionToken, PLATFORM_ID } from '@angular/core'
import { WINDOW } from '~integrator/data-access/web-api/window.token'

export const LOCAL_STORAGE = new InjectionToken<Storage>('An abstraction over window local storage object', {
  factory: (): Storage => {
    if (inject(PLATFORM_ID) === 'browser') {
      const windowRef = inject(WINDOW)
      if (storageAvailable(windowRef)) return windowRef.localStorage
    }
    return {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      clear(): void {},
      getItem(key: string): string | null { return null },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeItem(key: string): void {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setItem(key: string, value: string): void {},
    } as Storage
  },
  providedIn: 'root',
})

function storageAvailable(window: Window): boolean {
  let storage
  try {
    storage = window.localStorage
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === 'QuotaExceededError' &&
      // acknowledge QuotaExceededError only if there's something already stored
      !!storage &&
      storage.length !== 0
    )
  }
}
