import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { GuestQuestionnaireSectionMediatorService } from '~be/guest-questionnaire/guest-questionnaire-section-mediator.service'
import type { GuestQuestionnaireSectionParameters } from '~ui/guest-questionnaire/guest-questionnaire-section/guest-questionnaire-section.type'
import { GuestQuestionnaireSectionComponent } from './guest-questionnaire-section.component'

describe('GuestQuestionnaireSectionComponent', (): void => {
  let component: GuestQuestionnaireSectionComponent
  let fixture: ComponentFixture<GuestQuestionnaireSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        GoogleFormStubComponent,
      ],
      providers: [
        { provide: GuestQuestionnaireSectionMediatorService, useClass: GuestQuestionnaireSectionMediatorStubService },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(GuestQuestionnaireSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-google-form', template: '' })
class GoogleFormStubComponent {}

class GuestQuestionnaireSectionMediatorStubService {
  public readSectionParameters(): Observable<GuestQuestionnaireSectionParameters> {
    return of({
      descriptionParagraphs: ['Test data'],
      googleFormHeight: 42,
      googleFormURL: 'TestData',
      titleText: 'Test data',
    })
  }
}
