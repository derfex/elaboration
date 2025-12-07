import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { AppSectionsMediatorService } from '~be/app/app-sections-mediator.service'
import type { AppHeroSectionParameters } from '~ui/app-hero-section/app-hero-section/app-hero-section.type'
import { AppHeroSectionComponent } from './app-hero-section.component'

describe('AppHeroSectionComponent', (): void => {
  let component: AppHeroSectionComponent
  let fixture: ComponentFixture<AppHeroSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        AppHeroStubComponent,
      ],
      providers: [{ provide: AppSectionsMediatorService, useClass: AppSectionsMediatorStubService }],
    }).compileComponents()

    fixture = TestBed.createComponent(AppHeroSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-hero', template: '' })
class AppHeroStubComponent {}

class AppSectionsMediatorStubService {
  public readAppHeroSectionParameters(): Observable<AppHeroSectionParameters> {
    return of({
      illustrationImageAltText: 'Test data',
      illustrationImageHeight: 0,
      illustrationImageURL: 'TestData',
      illustrationImageWidth: 0,
      phraseText: 'Test data',
    })
  }
}
