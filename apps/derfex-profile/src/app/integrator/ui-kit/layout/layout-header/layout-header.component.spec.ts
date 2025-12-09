import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutHeaderComponent } from './layout-header.component'

describe('LayoutHeaderComponent', (): void => {
  let component: LayoutHeaderComponent
  let fixture: ComponentFixture<LayoutHeaderComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({})
      .compileComponents()

    fixture = TestBed.createComponent(LayoutHeaderComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
