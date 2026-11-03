import { DOCUMENT, inject, Service } from '@angular/core'

@Service()
export class LayoutScrollService {
  readonly #htmlElement = inject<Document>(DOCUMENT).documentElement as HTMLHtmlElement

  // TODO: Obtain the value of the constant centrally.
  // TODO: The header height is 0 when the browser tab is narrow.
  readonly #headerHeight = 44

  public scrollIntoView(element: HTMLElement): void {
    const { height, top } = element.getBoundingClientRect()
    if (top >= this.#headerHeight && top + height <= this.#htmlElement.scrollHeight) {
      return
    }
    element.scrollIntoView()
  }
}
