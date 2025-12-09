import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { DXActivityCardComponent } from './dx-activity-card.component'

describe('DXActivityCardComponent', (): void => {
  let component: DXActivityCardComponent
  let fixture: ComponentFixture<DXActivityCardComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(DXActivityCardComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
