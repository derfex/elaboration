import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeroSectionComponent } from './hero-section.component'

describe('HeroSectionComponent', (): void => {
  let component: HeroSectionComponent
  let fixture: ComponentFixture<HeroSectionComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(HeroSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
