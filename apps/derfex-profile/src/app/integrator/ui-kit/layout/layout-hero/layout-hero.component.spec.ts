import { ComponentFixture, TestBed } from '@angular/core/testing'
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
    const mottoTextValue = 'No data.'
    const titleTextValue = 'No data'
    fixture.componentRef.setInput('mottoText', mottoTextValue)
    fixture.componentRef.setInput('titleText', titleTextValue)
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
