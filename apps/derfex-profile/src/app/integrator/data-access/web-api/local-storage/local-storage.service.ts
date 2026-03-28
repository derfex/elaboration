import { inject, Injectable } from '@angular/core'
import { LOCAL_STORAGE } from '~integrator/data-access/web-api/local-storage/local-storage.token'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  readonly #storageRef = inject(LOCAL_STORAGE)

  public clear(): void {
    this.#storageRef.clear()
  }

  public getItem<T extends string>(key: string): T | null {
    return this.#storageRef.getItem(key) as T | null
  }

  public setItem(key: string, value: string): void {
    this.#storageRef.setItem(key, value)
  }

  public removeItem(key: string): void {
    this.#storageRef.removeItem(key)
  }
}
