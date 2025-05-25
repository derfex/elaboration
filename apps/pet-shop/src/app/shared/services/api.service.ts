import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// TODO: Rename to `BackendAPIService`.

@Injectable({
  providedIn: 'root',
})
export class APIService {
  readonly #httpClient = inject(HttpClient);

  public get<T>(url: string): Observable<T> {
    return this.#httpClient.get<T>(url);
  }
}
