import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NxWelcomePageComponent } from './nx-welcome-page.component'

describe('NxWelcomePageComponent', (): void => {
  let component: NxWelcomePageComponent
  let fixture: ComponentFixture<NxWelcomePageComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({})
      .compileComponents()

    fixture = TestBed.createComponent(NxWelcomePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
