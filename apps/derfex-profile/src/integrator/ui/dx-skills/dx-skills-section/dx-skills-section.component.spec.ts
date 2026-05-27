import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { DXSkillsSectionMediatorService } from '~be/dx-skills/dx-skills-section-mediator.service'
import type { DXSkillCodename } from '~entities/dx-skills/dx-skills.type'
import type {
  DXSkillsSectionParameters,
  DXSkillsSectionParametersAndList,
} from '~ui/dx-skills/dx-skills-section/dx-skills-section.type'
import type { DXSkillsListItem } from '~ui/dx-skills/dx-skills/dx-skills.type'
import { DXSkillsSectionComponent } from './dx-skills-section.component'

describe('DXSkillsSectionComponent', (): void => {
  let component: DXSkillsSectionComponent
  let fixture: ComponentFixture<DXSkillsSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        DXSkillsStubComponent,
      ],
      providers: [{ provide: DXSkillsSectionMediatorService, useClass: DXSkillsSectionMediatorStubService }],
    }).compileComponents()

    fixture = TestBed.createComponent(DXSkillsSectionComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('number', 0)
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-dx-skills', template: '' })
class DXSkillsStubComponent {}

class DXSkillsSectionMediatorStubService {
  public readSectionParametersAndList(): Observable<DXSkillsSectionParametersAndList> {
    const sectionParameters: DXSkillsSectionParameters = {
      descriptionText: 'Test data.',
      list: {
        emptyStateText: 'Test data.',
      },
      titleText: 'Test data',
    }
    const list: readonly DXSkillsListItem[] = [
      {
        codename: 'Angular' as DXSkillCodename,
        name: 'Test data',
        url: 'TestData',
      },
      {
        codename: 'TS' as DXSkillCodename,
        name: 'Test data',
        url: 'TestData',
      },
    ]
    return of({ list, sectionParameters })
  }
}
