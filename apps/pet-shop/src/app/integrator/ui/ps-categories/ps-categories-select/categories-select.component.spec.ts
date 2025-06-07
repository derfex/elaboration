import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PSCategoriesSelectComponent } from './categories-select.component'

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

describe('PSCategoriesSelectComponent', (): void => {
  let component: PSCategoriesSelectComponent
  let fixture: ComponentFixture<PSCategoriesSelectComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PSCategoriesSelectComponent],
    }).compileComponents()
  })

  beforeEach((): void => {
    fixture = TestBed.createComponent(PSCategoriesSelectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
