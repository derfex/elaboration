import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutHeroComponent } from './layout-hero.component'

describe('LayoutHeroComponent', (): void => {
  let component: LayoutHeroComponent
  let fixture: ComponentFixture<LayoutHeroComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(LayoutHeroComponent)
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
