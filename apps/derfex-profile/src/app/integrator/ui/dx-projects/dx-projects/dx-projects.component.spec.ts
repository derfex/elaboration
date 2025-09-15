import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DXProjectsComponent } from './dx-projects.component'

describe('DXProjectsComponent', (): void => {
  let component: DXProjectsComponent
  let fixture: ComponentFixture<DXProjectsComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(DXProjectsComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
