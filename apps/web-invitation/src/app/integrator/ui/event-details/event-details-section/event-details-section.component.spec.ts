import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { EventDetailsSectionMediatorService } from '~be/event-details/event-details-section-mediator.service'
import type { EventDetailsSectionParameters } from '~ui/event-details/event-details-section/event-details-section.type'
import type { EventDetailsWish } from '~ui/event-details/event-details/event-details.type'
import { EventDetailsSectionComponent } from './event-details-section.component'

describe('EventDetailsSectionComponent', (): void => {
  let component: EventDetailsSectionComponent
  let fixture: ComponentFixture<EventDetailsSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        EventDetailsStubComponent,
      ],
      providers: [{ provide: EventDetailsSectionMediatorService, useClass: EventDetailsSectionMediatorStubService }],
    }).compileComponents()

    fixture = TestBed.createComponent(EventDetailsSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-event-details', template: '' })
class EventDetailsStubComponent {}

class EventDetailsSectionMediatorStubService {
  public readSectionParameters(): Observable<EventDetailsSectionParameters> {
    const wishes: readonly EventDetailsWish[] = [
    {
      text: 'Test data',
    },
    {
      iconImageURL: 'TestData',
      text: 'Test data',
    },
  ]
    return of({
      descriptionParagraphs: ['Test data.'],
      titleText: 'Test data',
      wishes,
    } satisfies EventDetailsSectionParameters)
  }
}
