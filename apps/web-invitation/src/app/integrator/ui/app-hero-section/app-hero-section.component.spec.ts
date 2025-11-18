import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppHeroSectionComponent } from './app-hero-section.component'

describe('AppHeroSectionComponent', (): void => {
  let component: AppHeroSectionComponent
  let fixture: ComponentFixture<AppHeroSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        LayoutHeroStubComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AppHeroSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-layout-hero', template: '' })
class LayoutHeroStubComponent {}
