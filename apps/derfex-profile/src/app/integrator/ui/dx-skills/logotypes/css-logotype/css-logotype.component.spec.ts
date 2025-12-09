import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { CSSLogotypeComponent } from './css-logotype.component'

describe('CSSLogotypeComponent', (): void => {
  let component: CSSLogotypeComponent
  let fixture: ComponentFixture<CSSLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(CSSLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
