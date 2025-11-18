import { ChangeDetectionStrategy, Component, type OnInit, signal } from '@angular/core'
import type { EventProgramStageCodename } from '~entities/event-program-stages/event-program-stages.type'
import type { EventProgramSectionParameters } from '~ui/event-program/event-program-section/event-program-section.type'
import { EventProgramComponent } from '~ui/event-program/event-program/event-program.component'
import type { EventProgramStagesListItem } from '~ui/event-program/event-program/event-program.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EventProgramComponent],
  selector: 'app-event-program-section',
  styleUrl: './event-program-section.component.sass',
  templateUrl: './event-program-section.component.html',
})
export class EventProgramSectionComponent implements OnInit {
  protected readonly sectionParameters = signal<EventProgramSectionParameters>({
    titleText: 'No data',
  })
  protected readonly stages = signal<readonly EventProgramStagesListItem[]>([])

  public ngOnInit(): void {
    this.sectionParameters.set({
      titleText: 'No data',
    })
  }
}
