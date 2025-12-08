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
      const iconIsShown = !!iconImageURL
      if (!iconIsShown) {
        return {
          iconIsShown,
          text,
        }
      }
      const style = `background-image: url(${iconImageURL})`
      return {
        iconIsShown,
        style,
        text,
      }
    })
  })
}

type WishForTemplate = WishForTemplateWithIcon | WishForTemplateWithoutIcon

interface WishForTemplateWithIcon {
  readonly iconIsShown: true
  readonly style: string
  readonly text: string
}

interface WishForTemplateWithoutIcon {
  readonly iconIsShown: false
  readonly text: string
}
