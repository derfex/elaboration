import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event-details',
  styleUrl: './event-details.component.sass',
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent {
  public readonly descriptionParagraphs = input.required<readonly string[]>()
  public readonly titleText = input.required<string>()
  public readonly wishes = input.required<readonly string[]>()
}
