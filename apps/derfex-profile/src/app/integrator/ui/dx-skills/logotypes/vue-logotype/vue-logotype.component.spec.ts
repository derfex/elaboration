import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { VueLogotypeComponent } from './vue-logotype.component'

describe('VueLogotypeComponent', (): void => {
  let component: VueLogotypeComponent
  let fixture: ComponentFixture<VueLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(VueLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
