import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { GitLogotypeComponent } from './git-logotype.component'

describe('GitLogotypeComponent', (): void => {
  let component: GitLogotypeComponent
  let fixture: ComponentFixture<GitLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(GitLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
