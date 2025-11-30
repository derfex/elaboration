import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { DressCodeComponent } from './dress-code.component'

describe('DressCodeComponent', (): void => {
  let component: DressCodeComponent
  let fixture: ComponentFixture<DressCodeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(DressCodeComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('descriptionParagraphs', ['No data', 'No data'])
    fixture.componentRef.setInput('tints', ['#042'])
    fixture.componentRef.setInput('illustrationImageAltText', 'No data')
    fixture.componentRef.setInput('illustrationImageHeight', 42)
    fixture.componentRef.setInput('illustrationImageURL', 'NoData')
    fixture.componentRef.setInput('illustrationImageWidth', 42)
    fixture.componentRef.setInput('titleText', 'No data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
