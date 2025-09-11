import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GitHubIconComponent } from './github-icon.component'

describe('GitHubIconComponent', (): void => {
  let component: GitHubIconComponent
  let fixture: ComponentFixture<GitHubIconComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [GitHubIconComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GitHubIconComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
