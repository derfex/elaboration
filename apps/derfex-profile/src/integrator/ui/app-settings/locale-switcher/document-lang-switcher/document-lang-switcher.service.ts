import { DOCUMENT, inject, type Renderer2, Service } from '@angular/core'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'

@Service()
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
