import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { NodeJSLogotypeComponent } from './node-js-logotype.component'

describe('NodeJSLogotypeComponent', (): void => {
  let component: NodeJSLogotypeComponent
  let fixture: ComponentFixture<NodeJSLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(NodeJSLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
