import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PSEmptinessComponent } from './emptiness.component'

describe('PSEmptinessComponent', (): void => {
  let component: PSEmptinessComponent
  let fixture: ComponentFixture<PSEmptinessComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PSEmptinessComponent],
    }).compileComponents()
  })

  beforeEach((): void => {
    fixture = TestBed.createComponent(PSEmptinessComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
