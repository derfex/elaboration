import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { DXProjectsSectionMediatorService } from '~be/dx-projects/dx-projects-section-mediator.service'
import type { DXProjectCodename } from '~entities/dx-projects/dx-projects.type'
import type {
  DXProjectsSectionParameters,
  DXProjectsSectionParametersAndList,
} from '~ui/dx-projects/dx-projects-section/dx-projects-section.type'
import type { DXProjectsListItem } from '~ui/dx-projects/dx-projects/dx-projects.type'
import { DXProjectsSectionComponent } from './dx-projects-section.component'

describe('DXProjectsSectionComponent', (): void => {
  let component: DXProjectsSectionComponent
  let fixture: ComponentFixture<DXProjectsSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        DXProjectsStubComponent,
      ],
      providers: [{ provide: DXProjectsSectionMediatorService, useClass: DXProjectsSectionMediatorStubService }],
    }).compileComponents()

    fixture = TestBed.createComponent(DXProjectsSectionComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('number', 0)
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-dx-projects', template: '' })
class DXProjectsStubComponent {}

class DXProjectsSectionMediatorStubService {
  public readSectionParametersAndList(): Observable<DXProjectsSectionParametersAndList> {
    const sectionParameters: DXProjectsSectionParameters = {
      descriptionText: 'Test data.',
      list: {
        emptyStateText: 'Test data.',
        item: {
          resultTitleText: 'Test data',
          sourceCodeTitleText: 'Test data',
        },
      },
      titleText: 'Test data',
    }
    const list: readonly DXProjectsListItem[] = [
      {
        codename: 'project-1' as DXProjectCodename,
        name: 'Test data',
        resultURL: 'TestData',
        sourceURL: 'TestData',
      },
      {
        codename: 'project-2' as DXProjectCodename,
        name: 'Test data',
        resultURL: 'TestData',
        sourceURL: 'TestData',
      },
    ]
    return of({ list, sectionParameters })
  }
}
