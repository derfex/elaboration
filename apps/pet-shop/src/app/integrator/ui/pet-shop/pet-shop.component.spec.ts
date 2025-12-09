import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { PetShopComponent } from './pet-shop.component'

// TODO: Explore the tests, refactor, {migrate to `vitest`?}.

describe('PetShopComponent', (): void => {
  let component: PetShopComponent
  let fixture: ComponentFixture<PetShopComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PetShopComponent],
    }).compileComponents()
  })

  beforeEach((): void => {
    fixture = TestBed.createComponent(PetShopComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
