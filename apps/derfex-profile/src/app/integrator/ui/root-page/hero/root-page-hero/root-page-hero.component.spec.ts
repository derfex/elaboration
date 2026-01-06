import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { RootPageHeroComponent } from './root-page-hero.component'

describe('RootPageHeroComponent', (): void => {
  let component: RootPageHeroComponent
  let fixture: ComponentFixture<RootPageHeroComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(RootPageHeroComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('contactGitHubURL', 'No data')
    fixture.componentRef.setInput('contactTelegramURL', 'No data')
    fixture.componentRef.setInput('nameText', 'No data')
    fixture.componentRef.setInput('titleXML', 'No data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
