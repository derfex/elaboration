import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GitHubLogotypeComponent } from './github-logotype.component'

describe('GitHubLogotypeComponent', (): void => {
  let component: GitHubLogotypeComponent
  let fixture: ComponentFixture<GitHubLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(GitHubLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
