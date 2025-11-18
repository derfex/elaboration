import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppFooterSectionComponent } from './app-footer-section.component'

describe('AppFooterSectionComponent', (): void => {
  let component: AppFooterSectionComponent
  let fixture: ComponentFixture<AppFooterSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        LayoutFooterStubComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AppFooterSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-layout-footer', template: '' })
class LayoutFooterStubComponent {}
