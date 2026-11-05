import { inject, Service } from '@angular/core'
import { WINDOW } from '~integrator/data-access/web-api/window.token'

@Service()
export class MediaQueryService {
  readonly #windowRef = inject(WINDOW)

  public matchMedia(query: string): MediaQueryList {
    return this.#windowRef.matchMedia(query)
  }
}
