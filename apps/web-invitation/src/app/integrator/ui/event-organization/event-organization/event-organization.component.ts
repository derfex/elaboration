import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import type { EventOrganizationContact } from '~ui/event-organization/event-organization/event-organization.type'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event-organization',
  styleUrl: './event-organization.component.sass',
  templateUrl: './event-organization.component.html',
})
export class EventOrganizationComponent {
  public readonly contacts = input.required<readonly EventOrganizationContact[]>()
  public readonly descriptionParagraphs = input.required<readonly string[]>()
  public readonly titleText = input.required<string>()
}
