import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, Renderer2 } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AppSettingsService } from '~ui/app-settings/app-settings/app-settings.service'
import { LocaleSwitcherComponent } from '~ui/app-settings/locale-switcher/locale-switcher/locale-switcher.component'
import { ColorSchemeSwitcherComponent } from '~ui/app-settings/color-scheme-switcher/color-scheme-switcher.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    ColorSchemeSwitcherComponent,
    LocaleSwitcherComponent,
  ],
  selector: 'app-settings',
  styleUrl: './app-settings.component.sass',
  templateUrl: './app-settings.component.html',
})
export class AppSettingsComponent implements OnInit {
  readonly #appSettingsService = inject(AppSettingsService)
  readonly #destroyRef = inject(DestroyRef)
  readonly #renderer = inject(Renderer2)

  public ngOnInit(): void {
    this.#appSettingsService.initAndObserve(this.#renderer).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe()
  }
}
