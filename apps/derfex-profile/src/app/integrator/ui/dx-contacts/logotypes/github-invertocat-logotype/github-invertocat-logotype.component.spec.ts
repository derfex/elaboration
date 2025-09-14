import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GitHubInvertocatLogotypeComponent } from './github-invertocat-logotype.component'

describe('GitHubInvertocatLogotypeComponent', (): void => {
  let component: GitHubInvertocatLogotypeComponent
  let fixture: ComponentFixture<GitHubInvertocatLogotypeComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [GitHubInvertocatLogotypeComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GitHubInvertocatLogotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
