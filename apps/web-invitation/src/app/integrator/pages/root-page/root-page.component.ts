import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AppFooterSectionComponent } from '~ui/app-footer-section/app-footer-section/app-footer-section.component'
import { AppHeroSectionComponent } from '~ui/app-hero-section/app-hero-section/app-hero-section.component'
import { EventDaySectionComponent } from '~ui/event-day/event-day-section/event-day-section.component'
import { EventDetailsSectionComponent } from '~ui/event-details/event-details-section/event-details-section.component'
import { EventLocationSectionComponent } from '~ui/event-location/event-location-section/event-location-section.component'
import { EventOrganizationSectionComponent } from '~ui/event-organization/event-organization-section/event-organization-section.component'
import { EventProgramSectionComponent } from '~ui/event-program/event-program-section/event-program-section.component'
import { GuestQuestionnaireSectionComponent } from '~ui/guest-questionnaire/guest-questionnaire-section/guest-questionnaire-section.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Provided by the app.
    AppFooterSectionComponent,
    AppHeroSectionComponent,
    EventDaySectionComponent,
    EventDetailsSectionComponent,
    EventLocationSectionComponent,
    EventOrganizationSectionComponent,
    EventProgramSectionComponent,
    GuestQuestionnaireSectionComponent,
  ],
  selector: 'app-root-page',
  styleUrl: './root-page.component.sass',
  templateUrl: './root-page.component.html',
})
export class RootPageComponent {}
