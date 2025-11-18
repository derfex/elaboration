import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event-program',
  styleUrl: './event-program.component.sass',
  templateUrl: './event-program.component.html',
})
export class EventProgramComponent {
  public readonly titleText = input.required<string>()
}
