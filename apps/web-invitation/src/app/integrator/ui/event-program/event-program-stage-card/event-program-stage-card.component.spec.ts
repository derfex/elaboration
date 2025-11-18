import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EventProgramStageCardComponent } from './event-program-stage-card.component'

describe('EventProgramStageCardComponent', (): void => {
  let component: EventProgramStageCardComponent
  let fixture: ComponentFixture<EventProgramStageCardComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(EventProgramStageCardComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
