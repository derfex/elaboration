import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppThemeSwitcherService } from '~ui-kit/theming/app-theme-switcher.service'
import { ColorSchemeSwitcherComponent } from './color-scheme-switcher.component'

describe('ColorSchemeSwitcherComponent', (): void => {
  let component: ColorSchemeSwitcherComponent
  let fixture: ComponentFixture<ColorSchemeSwitcherComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ColorSchemeSwitcherComponent],
      providers: [{ provide: AppThemeSwitcherService, useClass: AppThemeSwitcherStubService }],
    }).compileComponents()

    fixture = TestBed.createComponent(ColorSchemeSwitcherComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

class AppThemeSwitcherStubService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public switchColorScheme(): void {}
}
