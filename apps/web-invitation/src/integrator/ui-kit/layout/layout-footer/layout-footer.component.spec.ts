import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutFooterComponent } from './layout-footer.component'

describe('LayoutFooterComponent', (): void => {
  let component: LayoutFooterComponent
  let fixture: ComponentFixture<LayoutFooterComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(LayoutFooterComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('appealText', 'Test data')
    fixture.componentRef.setInput('copyrightText', 'Test data')
    fixture.componentRef.setInput('craftedWithText', 'Test data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
