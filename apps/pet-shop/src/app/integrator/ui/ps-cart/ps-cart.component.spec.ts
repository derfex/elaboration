import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PSCartComponent } from './ps-cart.component'

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

describe('PSCartComponent', (): void => {
  let component: PSCartComponent
  let fixture: ComponentFixture<PSCartComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PSCartComponent],
    }).compileComponents()
  })

  beforeEach((): void => {
    fixture = TestBed.createComponent(PSCartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
