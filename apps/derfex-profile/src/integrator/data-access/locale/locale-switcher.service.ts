import { Service } from '@angular/core'
import { BehaviorSubject, distinctUntilChanged, type Observable } from 'rxjs'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'

@Service()
export class LocaleSwitcherService {
  readonly #locale = new BehaviorSubject<AppLocale>('EN')

  public get locale(): Observable<AppLocale> {
    return this.#locale.asObservable().pipe(distinctUntilChanged())
  }

  public set locale(locale: AppLocale) {
    this.#locale.next(locale)
  }
}
