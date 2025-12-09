import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { GoogleMapComponent } from './google-map.component'

describe('GoogleMapComponent', (): void => {
  let component: GoogleMapComponent
  let fixture: ComponentFixture<GoogleMapComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(GoogleMapComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('locationURL', 'TestData')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
