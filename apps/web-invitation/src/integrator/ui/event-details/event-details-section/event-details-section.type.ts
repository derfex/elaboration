import type { EventDetailsWish } from '~ui/event-details/event-details/event-details.type'

export interface EventDetailsSectionParameters {
  readonly descriptionParagraphs: readonly string[]
  readonly titleText: string
  readonly wishes: readonly EventDetailsWish[]
}
