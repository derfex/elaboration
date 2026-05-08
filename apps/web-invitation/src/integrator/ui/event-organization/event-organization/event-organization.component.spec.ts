import { type ComponentFixture, TestBed } from '@angular/core/testing'
import type { EventOrganizationContact } from '~ui/event-organization/event-organization/event-organization.type'
import { EventOrganizationComponent } from './event-organization.component'

describe('EventOrganizationComponent', (): void => {
  let component: EventOrganizationComponent
  let fixture: ComponentFixture<EventOrganizationComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(EventOrganizationComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    const contacts: readonly EventOrganizationContact[] = [{ hRef: 'TestData', titleText: 'Test data' }]
    fixture.componentRef.setInput('contacts', contacts)
    fixture.componentRef.setInput('descriptionParagraphs', ['Test data'])
    fixture.componentRef.setInput('titleText', 'Test data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
