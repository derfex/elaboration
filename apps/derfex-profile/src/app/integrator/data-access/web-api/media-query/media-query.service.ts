import { inject, Injectable } from '@angular/core'
import { WINDOW } from '~integrator/data-access/web-api/window.token'

@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {
  readonly #windowRef = inject(WINDOW)

  public matchMedia(query: string): MediaQueryList {
    return this.#windowRef.matchMedia(query)
  }
}
