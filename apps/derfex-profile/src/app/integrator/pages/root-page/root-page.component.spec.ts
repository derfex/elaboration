import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RootPageComponent } from './root-page.component'

describe('RootPageComponent', (): void => {
  let component: RootPageComponent
  let fixture: ComponentFixture<RootPageComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(RootPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
