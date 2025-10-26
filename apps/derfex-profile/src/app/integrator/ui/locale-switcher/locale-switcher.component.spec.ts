import { ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { LocaleSwitcherService } from '~integrator/data-access/locale/locale-switcher.service'
import type { AppLocale } from '~integrator/data-access/locale/locale.type'
import { LocaleSwitcherComponent } from './locale-switcher.component'

describe('LocaleSwitcherComponent', (): void => {
  let component: LocaleSwitcherComponent
  let fixture: ComponentFixture<LocaleSwitcherComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [LocaleSwitcherComponent],
      providers: [{ provide: LocaleSwitcherService, useClass: LocaleSwitcherStubService }],
    }).compileComponents()

    fixture = TestBed.createComponent(LocaleSwitcherComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

class LocaleSwitcherStubService {
  public get locale(): Observable<AppLocale> {
    return of('EN')
  }
}
