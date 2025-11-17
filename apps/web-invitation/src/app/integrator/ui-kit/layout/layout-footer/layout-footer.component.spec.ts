import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutFooterComponent } from './layout-footer.component'

describe('LayoutFooterComponent', (): void => {
  let component: LayoutFooterComponent
  let fixture: ComponentFixture<LayoutFooterComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(LayoutFooterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
