import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DXProjectCardComponent } from './dx-project-card.component'

describe('DXProjectCardComponent', (): void => {
  let component: DXProjectCardComponent
  let fixture: ComponentFixture<DXProjectCardComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(DXProjectCardComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
