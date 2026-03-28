import { DOCUMENT, inject, InjectionToken } from '@angular/core'

export const WINDOW = new InjectionToken<Window>('An abstraction over global window object', {
  factory: (): Window => inject(DOCUMENT).defaultView ?? {} as Window,
})
