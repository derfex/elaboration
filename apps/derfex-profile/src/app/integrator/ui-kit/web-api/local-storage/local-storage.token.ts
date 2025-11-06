import { inject, InjectionToken, PLATFORM_ID } from '@angular/core'

export const LOCAL_STORAGE = new InjectionToken<Storage>('window local storage object', {
  factory: (): Storage => {
    return inject(PLATFORM_ID) === 'browser' ? window.localStorage : ({} as Storage)
  },
  providedIn: 'root',
})
