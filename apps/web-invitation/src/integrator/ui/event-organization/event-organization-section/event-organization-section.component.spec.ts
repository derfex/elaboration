import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { EventOrganizationSectionMediatorService } from '~be/event-organization/event-organization-section-mediator.service'
import type { EventOrganizationSectionParameters } from '~ui/event-organization/event-organization-section/event-organization-section.type'
import { EventOrganizationSectionComponent } from './event-organization-section.component'

describe('EventOrganizationSectionComponent', (): void => {
  let component: EventOrganizationSectionComponent
  let fixture: ComponentFixture<EventOrganizationSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        EventOrganizationStubComponent,
      ],
      providers: [
        { provide: EventOrganizationSectionMediatorService, useClass: EventOrganizationSectionMediatorStubService },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(EventOrganizationSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-event-organization', template: '' })
class EventOrganizationStubComponent {}

class EventOrganizationSectionMediatorStubService {
  public readSectionParameters(): Observable<EventOrganizationSectionParameters> {
    const contacts: EventOrganizationSectionParameters['contacts'] = [
      {
        hRef: 'TestData',
        titleText: 'Test data',
      },
    ]
    return of({
      contacts,
      descriptionParagraphs: ['Test data'],
      titleText: 'Test data',
    } satisfies EventOrganizationSectionParameters)
  }
}
