import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { HTML5LogotypeComponent } from './html5-logotype.component'

describe('HTML5LogotypeComponent', (): void => {
  let component: HTML5LogotypeComponent
  let fixture: ComponentFixture<HTML5LogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(HTML5LogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
