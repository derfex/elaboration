import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { TelegramIconComponent } from '~ui/dx-contacts/icons/telegram-icon/telegram-icon.component'
import { GitHubInvertocatLogotypeComponent } from '~ui/dx-contacts/logotypes/github-invertocat-logotype/github-invertocat-logotype.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GitHubInvertocatLogotypeComponent, TelegramIconComponent],
  selector: 'app-layout-hero',
  styleUrl: './layout-hero.component.sass',
  templateUrl: './layout-hero.component.html',
})
export class LayoutHeroComponent {
  public readonly contactGitHubURL = input.required<string>()
  public readonly contactTelegramURL = input.required<string>()
  public readonly nameText = input.required<string>()
  public readonly titleXML = input.required<string>()

  readonly #titleParts = computed(() => {
    const title = this.titleXML()
    const [start, rest] = title.split('<highlight>')
    const [highlight, end] = rest.split('</highlight>')
    return {
      end,
      highlight,
      start,
    }
  })

  protected readonly titleEndText = computed<string>(() => this.#titleParts().end)
  protected readonly titleHighlightText = computed<string>(() => this.#titleParts().highlight)
  protected readonly titleStartText = computed<string>(() => this.#titleParts().start)
}
