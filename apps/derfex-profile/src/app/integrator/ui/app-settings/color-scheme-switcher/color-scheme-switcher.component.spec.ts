import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { AppThemeSwitcherService } from '~ui-kit/theming/app-theme-switcher.service'
import type { ThemeColorSchemeCodename } from '~ui-kit/theming/theming.type'
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
  public get colorScheme(): Observable<ThemeColorSchemeCodename> {
    return of()
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public switchColorScheme(): void {}
}
