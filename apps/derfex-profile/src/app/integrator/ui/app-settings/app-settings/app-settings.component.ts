import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, Renderer2 } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AppSettingsService } from '~ui/app-settings/app-settings/app-settings.service'
import { LocaleSwitcherComponent } from '~ui/app-settings/locale-switcher/locale-switcher/locale-switcher.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LocaleSwitcherComponent],
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
