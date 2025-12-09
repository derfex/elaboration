import { type ComponentFixture, TestBed } from '@angular/core/testing'
import type { EventDetailsWish } from '~ui/event-details/event-details/event-details.type'
import { EventDetailsComponent } from './event-details.component'

describe('EventDetailsComponent', (): void => {
  let component: EventDetailsComponent
  let fixture: ComponentFixture<EventDetailsComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(EventDetailsComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    const wishes: readonly EventDetailsWish[] = [
      {
        text: 'Test data',
      },
      {
        iconImageURL: 'TestData',
        text: 'Test data',
      },
    ]
    fixture.componentRef.setInput('descriptionParagraphs', ['Test data', 'Test data'])
    fixture.componentRef.setInput('titleText', 'Test data')
    fixture.componentRef.setInput('wishes', wishes)
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
