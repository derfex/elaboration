import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { ArrowLeftIconComponent } from '~ui-kit/button/arrow-left-icon/arrow-left-icon.component'
import { GitHubInvertocatLogotypeComponent } from '~ui/dx-contacts/logotypes/github-invertocat-logotype/github-invertocat-logotype.component'
import { GmailLogotypeComponent } from '~ui/dx-contacts/logotypes/gmail-logotype/gmail-logotype.component'
import { TelegramLogotypeComponent } from '~ui/dx-contacts/logotypes/telegram-logotype/telegram-logotype.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArrowLeftIconComponent,
    GitHubInvertocatLogotypeComponent,
    GmailLogotypeComponent,
    TelegramLogotypeComponent,
  ],
  selector: 'app-root-page-hero',
  styleUrl: './root-page-hero.component.sass',
  templateUrl: './root-page-hero.component.html',
})
export class RootPageHeroComponent {
  public readonly callToActionText = input.required<string>()
  public readonly contactGitHubURL = input.required<string>()
  public readonly contactGmailURL = input.required<string>()
  public readonly contactTelegramText = input.required<string>()
  public readonly contactTelegramURL = input.required<string>()
  public readonly contactsText = input.required<string>()
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
