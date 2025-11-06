import { inject, Injectable } from '@angular/core'
import { LOCAL_STORAGE } from '~ui-kit/web-api/local-storage/local-storage.token'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  readonly #storage = inject(LOCAL_STORAGE)

  public clear(): void {
    this.#storage.clear()
  }

  public getItem<T extends string>(key: string): T | null {
    return this.#storage.getItem(key) as T | null
  }

  public setItem(key: string, value: string): void {
    this.#storage.setItem(key, value)
  }

  public removeItem(key: string): void {
    this.#storage.removeItem(key)
  }
}
