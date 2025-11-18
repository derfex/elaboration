import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EventProgramSectionMediatorService } from '~be/event-program/event-program-section-mediator.service'
import type {
  EventProgramSectionParameters,
  EventProgramSectionParametersAndList,
} from '~ui/event-program/event-program-section/event-program-section.type'
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
  readonly #destroyRef = inject(DestroyRef)
  readonly #eventProgramSectionMediatorService = inject(EventProgramSectionMediatorService)

  protected readonly sectionParameters = signal<EventProgramSectionParameters>({
    titleText: 'No data',
  })
  protected readonly stages = signal<readonly EventProgramStagesListItem[]>([])

  public ngOnInit(): void {
    this.#eventProgramSectionMediatorService
      .readSectionParametersAndList()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(({ list, sectionParameters }: EventProgramSectionParametersAndList): void => {
        this.sectionParameters.set({
          titleText: sectionParameters.titleText,
        })
        this.stages.set(list)
      })
  }
}
