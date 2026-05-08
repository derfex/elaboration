import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { EventDayComponent } from './event-day.component'

describe('EventDayComponent', (): void => {
  let component: EventDayComponent
  let fixture: ComponentFixture<EventDayComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(EventDayComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('appealText', 'Test data')
    fixture.componentRef.setInput('authorsSignatureLines', ['Test data', 'Test data'])
    fixture.componentRef.setInput('eventDateCaptionText', 'Test data')
    fixture.componentRef.setInput('eventDateValueText', 'Test data')
    fixture.componentRef.setInput('titleText', 'Test data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
