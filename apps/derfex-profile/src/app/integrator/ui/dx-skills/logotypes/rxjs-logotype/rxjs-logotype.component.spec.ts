import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RxJSLogotypeComponent } from './rxjs-logotype.component'

describe('RxJSLogotypeComponent', (): void => {
  let component: RxJSLogotypeComponent
  let fixture: ComponentFixture<RxJSLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(RxJSLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
