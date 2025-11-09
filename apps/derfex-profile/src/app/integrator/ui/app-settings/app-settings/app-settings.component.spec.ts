import { ComponentFixture, TestBed } from '@angular/core/testing'
import { type Observable, of } from 'rxjs'
import { AppSettingsService } from '~ui/app-settings/app-settings/app-settings.service'
import { AppSettingsComponent } from './app-settings.component'

describe('AppSettingsComponent', (): void => {
  let component: AppSettingsComponent
  let fixture: ComponentFixture<AppSettingsComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AppSettingsComponent],
      providers: [{ provide: AppSettingsService, useClass: AppSettingsStubService }],
    }).compileComponents()

    fixture = TestBed.createComponent(AppSettingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})

class AppSettingsStubService {
  public get initAndObserve(): Observable<void> {
    return of()
  }
}
