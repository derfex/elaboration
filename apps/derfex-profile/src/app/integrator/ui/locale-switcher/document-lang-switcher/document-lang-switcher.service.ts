import { DOCUMENT, inject, Injectable, type Renderer2 } from '@angular/core'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'

@Injectable({
  providedIn: 'root',
})
export class DocumentLangSwitcherService {
  readonly #htmlElement = inject(DOCUMENT).documentElement

  #lang: DocumentLang = 'en'

  public switchLang(renderer: Renderer2, locale: AppLocale): void {
    const lang: DocumentLang = locale !== 'RU' ? 'en' : 'ru'
    if (this.#lang === lang) return
    this.#lang = lang
    renderer.setAttribute(this.#htmlElement, 'lang', lang)
  }
}

type DocumentLang = 'en' | 'ru'
