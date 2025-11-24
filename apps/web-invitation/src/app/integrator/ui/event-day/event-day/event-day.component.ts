import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event-day',
  styleUrl: './event-day.component.sass',
  templateUrl: './event-day.component.html',
})
export class EventDayComponent {
  public readonly appealText = input.required<string>()
  public readonly authorsSignatureLines = input.required<readonly string[]>()
  public readonly eventDateCaptionText = input.required<string>()
  public readonly eventDateValueText = input.required<string>()
  public readonly titleText = input.required<string>()
}
