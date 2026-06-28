import { DOCUMENT, inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LayoutScrollService {
  readonly #htmlElement = inject<Document>(DOCUMENT).documentElement as HTMLHtmlElement

  // TODO: Obtain the value of the constant centrally.
  // TODO: The header height is 0 when the browser tap is narrow.
  readonly #headerHeight = 44

  public scrollIntoView(element: HTMLElement): void {
    const { height, top } = element.getBoundingClientRect()
    if (top >= this.#headerHeight && top + height <= this.#htmlElement.scrollHeight) {
      return
    }
    element.scrollIntoView()
  }
}
