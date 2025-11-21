import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-google-form',
  styleUrl: './google-form.component.sass',
  templateUrl: './google-form.component.html',
})
export class GoogleFormComponent {
  readonly #domSanitizer = inject(DomSanitizer)

  public readonly height = input.required<number>()
  public readonly url = input.required<string>()

  protected readonly loadingText = 'Загрузка…'

  protected readonly src = computed<SafeResourceUrl>(() => {
    return this.#domSanitizer.bypassSecurityTrustResourceUrl(this.url())
  })

  protected readonly style = computed<string>(() => {
    return `height: ${this.height()}px`
  })
}
