import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { UIKitSectionComponent } from './ui-kit-section.component'

describe('UIKitSectionComponent', (): void => {
  let component: UIKitSectionComponent
  let fixture: ComponentFixture<UIKitSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        UIKitPresentationStubComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(UIKitSectionComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('number', 0)
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-ui-kit-presentation', template: '' })
class UIKitPresentationStubComponent {}
