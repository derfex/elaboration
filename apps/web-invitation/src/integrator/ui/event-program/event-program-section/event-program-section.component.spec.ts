import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { EventProgramSectionMediatorService } from '~be/event-program/event-program-section-mediator.service'
import type { EventProgramStageCodename } from '~entities/event-program-stages/event-program-stages.type'
import type {
  EventProgramSectionParameters,
  EventProgramSectionParametersAndList,
} from '~ui/event-program/event-program-section/event-program-section.type'
import type { EventProgramStagesListItem } from '~ui/event-program/event-program/event-program.type'
import { EventProgramSectionComponent } from './event-program-section.component'

describe('EventProgramSectionComponent', (): void => {
  let component: EventProgramSectionComponent
  let fixture: ComponentFixture<EventProgramSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        EventProgramStubComponent,
      ],
      providers: [{ provide: EventProgramSectionMediatorService, useClass: EventProgramSectionMediatorStubService }],
    }).compileComponents()

    fixture = TestBed.createComponent(EventProgramSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-event-program', template: '' })
class EventProgramStubComponent {}

class EventProgramSectionMediatorStubService {
  public readSectionParametersAndList(): Observable<EventProgramSectionParametersAndList> {
    const list: readonly EventProgramStagesListItem[] = [
      {
        codename: 'TestData' as EventProgramStageCodename,
        descriptionParagraphs: ['Test data'],
        periodFrom: '00:42',
        title: 'Test data',
      },
    ]
    const sectionParameters: EventProgramSectionParameters = {
      titleText: 'Test data',
    }
    return of({
      list,
      sectionParameters,
    } satisfies EventProgramSectionParametersAndList)
  }
}
