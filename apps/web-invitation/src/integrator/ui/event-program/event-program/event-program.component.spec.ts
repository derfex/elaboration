import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import type { EventProgramStageCodename } from '~entities/event-program-stages/event-program-stages.type'
import type { EventProgramStagesListItem } from '~ui/event-program/event-program/event-program.type'
import { EventProgramComponent } from './event-program.component'

describe('EventProgramComponent', (): void => {
  let component: EventProgramComponent
  let fixture: ComponentFixture<EventProgramComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        EventProgramStageCardStubComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(EventProgramComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    const stages: readonly EventProgramStagesListItem[] = [
      {
        codename: 'TestData' as EventProgramStageCodename,
        descriptionParagraphs: ['Test data'],
        periodFrom: '00:42',
        title: 'Test data',
      },
    ]
    fixture.componentRef.setInput('stages', stages)
    fixture.componentRef.setInput('titleText', 'Test data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-event-program-stage-card', template: '' })
class EventProgramStageCardStubComponent {}
