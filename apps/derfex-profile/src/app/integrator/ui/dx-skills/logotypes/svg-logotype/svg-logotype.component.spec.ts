import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SVGLogotypeComponent } from './svg-logotype.component'

describe('SVGLogotypeComponent', (): void => {
  let component: SVGLogotypeComponent
  let fixture: ComponentFixture<SVGLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(SVGLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
