import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BackendAPIService {
  // region ## Properties
  // region ### Injected
  readonly #httpClient = inject(HttpClient)
  // endregion ### Injected
  // endregion ## Properties

  // region ## Public API
  public get<T>(url: string): Observable<T> {
    return this.#httpClient.get<T>(url)
  }
  // endregion ## Public API
}
