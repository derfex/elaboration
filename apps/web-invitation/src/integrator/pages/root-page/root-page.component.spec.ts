import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { RootPageComponent } from './root-page.component'

describe('RootPageComponent', (): void => {
  let component: RootPageComponent
  let fixture: ComponentFixture<RootPageComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        AppFooterSectionStubComponent,
        AppHeroSectionStubComponent,
        DressCodeSectionStubComponent,
        EventDaySectionStubComponent,
        EventDetailsSectionStubComponent,
        EventLocationSectionStubComponent,
        EventOrganizationSectionStubComponent,
        EventProgramSectionStubComponent,
        GuestQuestionnaireSectionStubComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RootPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-footer-section', template: '' })
class AppFooterSectionStubComponent {}

@Component({ selector: 'app-hero-section', template: '' })
class AppHeroSectionStubComponent {}

@Component({ selector: 'app-dress-code-section', template: '' })
class DressCodeSectionStubComponent {}

@Component({ selector: 'app-event-day-section', template: '' })
class EventDaySectionStubComponent {}

@Component({ selector: 'app-event-details-section', template: '' })
class EventDetailsSectionStubComponent {}

@Component({ selector: 'app-event-location-section', template: '' })
class EventLocationSectionStubComponent {}

@Component({ selector: 'app-event-organization-section', template: '' })
class EventOrganizationSectionStubComponent {}

@Component({ selector: 'app-event-program-section', template: '' })
class EventProgramSectionStubComponent {}

@Component({ selector: 'app-guest-questionnaire-section', template: '' })
class GuestQuestionnaireSectionStubComponent {}
