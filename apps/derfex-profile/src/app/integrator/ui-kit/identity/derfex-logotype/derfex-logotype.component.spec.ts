import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DerfexLogotypeComponent } from './derfex-logotype.component'

describe('DerfexLogotypeComponent', (): void => {
  let component: DerfexLogotypeComponent
  let fixture: ComponentFixture<DerfexLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({})
      .compileComponents()

    fixture = TestBed.createComponent(DerfexLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
