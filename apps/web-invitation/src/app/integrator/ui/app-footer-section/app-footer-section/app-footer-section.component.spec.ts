import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { AppSectionsMediatorService } from '~be/app/app-sections-mediator.service'
import type { AppFooterSectionParameters } from '~ui/app-footer-section/app-footer-section/app-footer-section.type'
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
      providers: [{ provide: AppSectionsMediatorService, useClass: AppSectionsMediatorStubService }],
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

class AppSectionsMediatorStubService {
  public readAppFooterSectionParameters(): Observable<AppFooterSectionParameters> {
    return of({
      appealText: 'Test data',
      copyrightText: 'Test data',
      craftedWithText: 'Test data',
    } satisfies AppFooterSectionParameters)
  }
}
