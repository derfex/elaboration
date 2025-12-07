import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { GoogleFormComponent } from './google-form.component'

describe('GoogleFormComponent', (): void => {
  let component: GoogleFormComponent
  let fixture: ComponentFixture<GoogleFormComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(GoogleFormComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('height', 1)
    fixture.componentRef.setInput('url', 'TestData')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
