import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutLoaderComponent } from './layout-loader.component'

describe('LayoutLoaderComponent', (): void => {
  let component: LayoutLoaderComponent
  let fixture: ComponentFixture<LayoutLoaderComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(LayoutLoaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
