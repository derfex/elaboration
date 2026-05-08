import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { EventProgramStageCardComponent } from '~ui/event-program/event-program-stage-card/event-program-stage-card.component'
import type { EventProgramStagesListItem } from '~ui/event-program/event-program/event-program.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EventProgramStageCardComponent],
  selector: 'app-event-program',
  styleUrl: './event-program.component.sass',
  templateUrl: './event-program.component.html',
})
export class EventProgramComponent {
  public readonly stages = input.required<readonly EventProgramStagesListItem[]>()
  public readonly titleText = input.required<string>()
}
