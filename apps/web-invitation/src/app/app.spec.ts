import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { App } from './app'

describe('App', (): void => {
  let component: App
  let fixture: ComponentFixture<App>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents()

    fixture = TestBed.createComponent(App)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
