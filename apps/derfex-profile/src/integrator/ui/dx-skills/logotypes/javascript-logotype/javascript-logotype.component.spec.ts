import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { JavaScriptLogotypeComponent } from './javascript-logotype.component'

describe('JavaScriptLogotypeComponent', (): void => {
  let component: JavaScriptLogotypeComponent
  let fixture: ComponentFixture<JavaScriptLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(JavaScriptLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
