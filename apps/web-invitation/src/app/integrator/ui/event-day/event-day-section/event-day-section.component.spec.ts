import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { EventDaySectionMediatorService } from '~be/event-day/event-day-section-mediator.service'
import type { EventDaySectionParameters } from '~ui/event-day/event-day-section/event-day-section.type'
import { EventDaySectionComponent } from './event-day-section.component'

describe('EventDaySectionComponent', (): void => {
  let component: EventDaySectionComponent
  let fixture: ComponentFixture<EventDaySectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        EventDayStubComponent,
        TextOrnamentStubComponent,
      ],
      providers: [{ provide: EventDaySectionMediatorService, useClass: EventDaySectionMediatorStubService }],
    }).compileComponents()

    fixture = TestBed.createComponent(EventDaySectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-event-day', template: '' })
class EventDayStubComponent {}

@Component({ selector: 'app-text-ornament', template: '' })
class TextOrnamentStubComponent {}

class EventDaySectionMediatorStubService {
  public readSectionParameters(): Observable<EventDaySectionParameters> {
    return of({
      appealText: 'Test data',
      authorsSignatureLines: ['Test data', 'Test data'],
      eventDateCaptionText: 'Test data',
      eventDateValueText: '04.02.0042',
      ornament: {
        columnMinWidth: 42,
        count: 42,
        fontSize: 42,
        text: 'Test data',
      },
      titleText: 'Test data',
    } satisfies EventDaySectionParameters)
  }
}
