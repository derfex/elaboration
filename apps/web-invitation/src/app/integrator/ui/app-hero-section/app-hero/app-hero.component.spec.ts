import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { AppHeroComponent } from './app-hero.component'

describe('AppHeroComponent', (): void => {
  let component: AppHeroComponent
  let fixture: ComponentFixture<AppHeroComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(AppHeroComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('illustrationImageAltText', 'No data')
    fixture.componentRef.setInput('illustrationImageHeight', 42)
    fixture.componentRef.setInput('illustrationImageURL', 'NoData')
    fixture.componentRef.setInput('illustrationImageWidth', 42)
    fixture.componentRef.setInput('phraseText', 'No data.')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
