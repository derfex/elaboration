import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import type { EventDetailsWish } from '~ui/event-details/event-details/event-details.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event-details',
  styleUrl: './event-details.component.sass',
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent {
  public readonly descriptionParagraphs = input.required<readonly string[]>()
  public readonly titleText = input.required<string>()
  public readonly wishes = input.required<readonly EventDetailsWish[]>()

  protected readonly wishesForTemplate = computed<readonly WishForTemplate[]>(() => {
    return this.wishes().map(({ iconImageURL, text }) => {
      const isonIsShown = !!iconImageURL
      if (!isonIsShown) {
        return {
          isonIsShown,
          text,
        }
      }
      const style = `background-image: url(${iconImageURL})`
      return {
        isonIsShown,
        style,
        text,
      }
    })
  })
}

type WishForTemplate = WishForTemplateWithIcon | WishForTemplateWithoutIcon

interface WishForTemplateWithIcon {
  readonly isonIsShown: true
  readonly style: string
  readonly text: string
}

interface WishForTemplateWithoutIcon {
  readonly isonIsShown: false
  readonly text: string
}
