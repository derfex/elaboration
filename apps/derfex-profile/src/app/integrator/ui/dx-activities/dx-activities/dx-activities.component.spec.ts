import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { DXActivitiesComponent } from './dx-activities.component'

describe('DXActivitiesComponent', (): void => {
  let component: DXActivitiesComponent
  let fixture: ComponentFixture<DXActivitiesComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(DXActivitiesComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
