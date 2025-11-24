import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { EventDayComponent } from './event-day.component'

describe('EventDayComponent', (): void => {
  let component: EventDayComponent
  let fixture: ComponentFixture<EventDayComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(EventDayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
