import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { EventLocationSectionMediatorService } from '~be/event-location/event-location-section-mediator.service'
import type { EventLocationSectionParameters } from '~ui/event-location/event-location-section/event-location-section.type'
import { EventLocationSectionComponent } from './event-location-section.component'

describe('EventLocationSectionComponent', (): void => {
  let component: EventLocationSectionComponent
  let fixture: ComponentFixture<EventLocationSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        TextOrnamentStubComponent,
      ],
      providers: [{ provide: EventLocationSectionMediatorService, useClass: EventLocationSectionMediatorStubService }],
    }).compileComponents()

    fixture = TestBed.createComponent(EventLocationSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-text-ornament', template: '' })
class TextOrnamentStubComponent {}

class EventLocationSectionMediatorStubService {
  public readSectionParameters(): Observable<EventLocationSectionParameters> {
    return of({
      illustrationCaptionText: 'Test data',
      illustrationImageAltText: 'Test data',
      illustrationImageHeight: 42,
      illustrationImageURL: 'Test data',
      illustrationImageWidth: 42,
      locationURL: 'Test data',
      mapDescriptionParagraphs: ['Test data'],
      ornament: {
        columnMinWidth: 42,
        count: 42,
        fontSize: 42,
        text: 'Test data',
      },
      showMapButtonText: 'Test data',
      titleText: 'Test data',
      transferParagraphs: ['Test data'],
    } satisfies EventLocationSectionParameters)
  }
}
