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
    fixture.componentRef.setInput('appealText', 'No data')
    fixture.componentRef.setInput('authorsSignatureLines', ['No data', 'No data'])
    fixture.componentRef.setInput('eventDateCaptionText', 'No data')
    fixture.componentRef.setInput('eventDateValueText', 'No data')
    fixture.componentRef.setInput('titleText', 'No data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
