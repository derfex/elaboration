import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { TelegramLogotypeComponent } from './telegram-logotype.component'

describe('TelegramLogotypeComponent', (): void => {
  let component: TelegramLogotypeComponent
  let fixture: ComponentFixture<TelegramLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TelegramLogotypeComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TelegramLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
