import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { HeroSectionMediatorService } from '~be/hero/hero-section-mediator.service'
import type { HeroSectionParameters } from '~ui/root-page/hero/hero-section/hero-section.type'
import { HeroSectionComponent } from './hero-section.component'

describe('HeroSectionComponent', (): void => {
  let component: HeroSectionComponent
  let fixture: ComponentFixture<HeroSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        LayoutHeroStubComponent,
        RootPageHeroStubComponent,
      ],
      providers: [{ provide: HeroSectionMediatorService, useClass: HeroSectionMediatorStubService }],
    }).compileComponents()

    fixture = TestBed.createComponent(HeroSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-layout-hero', template: '' })
class LayoutHeroStubComponent {}

@Component({ selector: 'app-root-page-hero', template: '' })
class RootPageHeroStubComponent {}

class HeroSectionMediatorStubService {
  public readSectionParameters(): Observable<HeroSectionParameters> {
    const sectionParameters: HeroSectionParameters = {
      contactGitHubURL: 'TestData',
      contactGmailURL: 'TestData',
      contactTelegramURL: 'TestData',
      contactsText: 'Test data',
      nameText: 'Test data',
      titleXML: 'Test <highlight>data</highlight>',
    }
    return of(sectionParameters)
  }
}
