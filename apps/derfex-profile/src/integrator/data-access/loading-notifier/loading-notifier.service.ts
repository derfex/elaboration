import { Service } from '@angular/core'
import { BehaviorSubject, distinctUntilChanged, type Observable } from 'rxjs'

@Service()
export class LoadingNotifierService {
  readonly #loading = new BehaviorSubject<boolean>(false)
  readonly #processCodenamesSet = new Set<string>()

  public get loading(): Observable<boolean> {
    return this.#loading.asObservable().pipe(distinctUntilChanged())
  }

  public setProcessLoading(processCodename: string, loading: boolean): void {
    if (loading) {
      this.#processCodenamesSet.add(processCodename)
    } else {
      this.#processCodenamesSet.delete(processCodename)
    }
    this.#loading.next(!!this.#processCodenamesSet.size)
  }
}
