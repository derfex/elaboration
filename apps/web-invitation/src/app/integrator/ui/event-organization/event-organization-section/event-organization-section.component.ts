import { ChangeDetectionStrategy, Component, DestroyRef, inject, type OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EventOrganizationSectionMediatorService } from '~be/event-organization/event-organization-section-mediator.service'
import type { EventOrganizationSectionParameters } from '~ui/event-organization/event-organization-section/event-organization-section.type'
import { EventOrganizationComponent } from '~ui/event-organization/event-organization/event-organization.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EventOrganizationComponent],
  selector: 'app-event-organization-section',
  styleUrl: './event-organization-section.component.sass',
  templateUrl: './event-organization-section.component.html',
})
export class EventOrganizationSectionComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #eventOrganizationSectionMediatorService = inject(EventOrganizationSectionMediatorService)

  protected readonly sectionParameters = signal<EventOrganizationSectionParameters>({
    contacts: [],
    descriptionParagraphs: [],
    titleText: 'No data',
  })

  public ngOnInit(): void {
    this.#readSectionParameters()
  }

  #readSectionParameters(): void {
    this.#eventOrganizationSectionMediatorService
      .readSectionParameters()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((parameters: EventOrganizationSectionParameters): void => {
        this.sectionParameters.set(parameters)
      })
  }
}
