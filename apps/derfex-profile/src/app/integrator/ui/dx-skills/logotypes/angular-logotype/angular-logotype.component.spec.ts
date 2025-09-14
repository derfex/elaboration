import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AngularLogotypeComponent } from './angular-logotype.component'

describe('AngularLogotypeComponent', (): void => {
  let component: AngularLogotypeComponent
  let fixture: ComponentFixture<AngularLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(AngularLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
