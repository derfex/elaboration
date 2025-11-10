import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SASSLogotypeComponent } from './sass-logotype.component'

describe('SASSLogotypeComponent', (): void => {
  let component: SASSLogotypeComponent
  let fixture: ComponentFixture<SASSLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(SASSLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
