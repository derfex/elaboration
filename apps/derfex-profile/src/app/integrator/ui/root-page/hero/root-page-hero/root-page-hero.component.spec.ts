import { Component } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { RootPageHeroComponent } from './root-page-hero.component'

describe('RootPageHeroComponent', (): void => {
  let component: RootPageHeroComponent
  let fixture: ComponentFixture<RootPageHeroComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        // Stubs.
        GitHubInvertocatLogotypeStubComponent,
        GmailLogotypeStubComponent,
        TelegramLogotypeStubComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RootPageHeroComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('contactGitHubURL', 'TestData')
    fixture.componentRef.setInput('contactGmailURL', 'TestData')
    fixture.componentRef.setInput('contactTelegramURL', 'TestData')
    fixture.componentRef.setInput('nameText', 'Test data')
    fixture.componentRef.setInput('titleXML', 'Test <highlight>data</highlight>')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})

@Component({ selector: 'app-github-invertocat-logotype', template: '' })
class GitHubInvertocatLogotypeStubComponent {}

@Component({ selector: 'app-gmail-logotype', template: '' })
class GmailLogotypeStubComponent {}

@Component({ selector: 'app-telegram-logotype', template: '' })
class TelegramLogotypeStubComponent {}
