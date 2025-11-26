import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { TextOrnamentComponent } from './text-ornament.component'

describe('TextOrnamentComponent', (): void => {
  let component: TextOrnamentComponent
  let fixture: ComponentFixture<TextOrnamentComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(TextOrnamentComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('paragraphs', ['No data', 'No data'])
    fixture.componentRef.setInput('titleText', 'No data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
