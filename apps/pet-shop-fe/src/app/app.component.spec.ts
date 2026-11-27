// # External modules
import { TestBed } from '@angular/core/testing'
import { RouterModule } from '@angular/router'

// # Internal modules
import { AppComponent } from './app.component'

describe('AppComponent', (): void => {
  let component: AppComponent

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
    }).compileComponents()

    component = TestBed.createComponent(AppComponent).componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
