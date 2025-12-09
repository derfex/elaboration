import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { DressCodeSectionMediatorService } from '~be/dress-code/dress-code-section-mediator.service'
import type { DressCodeSectionParameters } from '~ui/dress-code/dress-code-section/dress-code-section.type'
import { DressCodeSectionComponent } from './dress-code-section.component'

describe('DressCodeSectionComponent', (): void => {
  let component: DressCodeSectionComponent
  let fixture: ComponentFixture<DressCodeSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        DressCodeStubComponent,
      ],
      providers: [{ provide: DressCodeSectionMediatorService, useClass: DressCodeSectionMediatorStubService }],
    }).compileComponents()

    fixture = TestBed.createComponent(DressCodeSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-dress-code', template: '' })
class DressCodeStubComponent {}

class DressCodeSectionMediatorStubService {
  public readSectionParameters(): Observable<DressCodeSectionParameters> {
    return of({
      descriptionParagraphs: ['Test data', 'Test data'],
      illustration: {
        imageAltText: 'Test data',
        imageHeight: 42,
        imageURL: 'TestData',
        imageWidth: 42,
      },
      tints: ['Test data', 'Test data'],
      titleText: 'Test data',
    } satisfies DressCodeSectionParameters)
  }
}
