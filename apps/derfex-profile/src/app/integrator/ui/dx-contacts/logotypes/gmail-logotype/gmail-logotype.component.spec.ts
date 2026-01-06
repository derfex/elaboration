import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { GmailLogotypeComponent } from './gmail-logotype.component'

describe('GmailLogotypeComponent', (): void => {
  let component: GmailLogotypeComponent
  let fixture: ComponentFixture<GmailLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [GmailLogotypeComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GmailLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
