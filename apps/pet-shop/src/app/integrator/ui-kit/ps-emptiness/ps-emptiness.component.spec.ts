import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PSEmptinessComponent } from './ps-emptiness.component'

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

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
