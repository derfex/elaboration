import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PSProductsComponent } from './products.component'

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

describe('PSProductsComponent', (): void => {
  let component: PSProductsComponent
  let fixture: ComponentFixture<PSProductsComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PSProductsComponent],
    }).compileComponents()
  })

  beforeEach((): void => {
    fixture = TestBed.createComponent(PSProductsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
