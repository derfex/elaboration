import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event-program-stage-card',
  styleUrl: './event-program-stage-card.component.sass',
  templateUrl: './event-program-stage-card.component.html',
})
export class EventProgramStageCardComponent {
  public readonly descriptionParagraphs = input.required<readonly string[]>()
  public readonly periodFrom = input.required<string>()
  public readonly title = input.required<string>()
}
