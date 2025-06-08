import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BackendAPIService {
  readonly #httpClient = inject(HttpClient)

  public get<T>(url: string): Observable<T> {
    return this.#httpClient.get<T>(url)
  }
}
