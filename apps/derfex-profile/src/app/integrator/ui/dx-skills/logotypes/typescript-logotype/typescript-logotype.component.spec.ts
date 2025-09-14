import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TypeScriptLogotypeComponent } from './typescript-logotype.component'

describe('TypeScriptLogotypeComponent', (): void => {
  let component: TypeScriptLogotypeComponent
  let fixture: ComponentFixture<TypeScriptLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(TypeScriptLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
