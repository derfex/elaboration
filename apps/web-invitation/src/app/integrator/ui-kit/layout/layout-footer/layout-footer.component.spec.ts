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
    fixture.componentRef.setInput('appealText', 'No data')
    fixture.componentRef.setInput('copyrightText', 'No data')
    fixture.componentRef.setInput('craftedWithText', 'No data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
