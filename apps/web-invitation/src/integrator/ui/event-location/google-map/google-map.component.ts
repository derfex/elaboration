import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-google-map',
  styleUrl: './google-map.component.sass',
  templateUrl: './google-map.component.html',
})
export class GoogleMapComponent {
  readonly #domSanitizer = inject(DomSanitizer)

  public readonly locationURL = input.required<string>()

  protected readonly src = computed<SafeResourceUrl>(() => {
    return this.#domSanitizer.bypassSecurityTrustResourceUrl(this.locationURL())
  })
}
