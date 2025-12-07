import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutArticleWithParagraphsComponent } from './layout-article-with-paragraphs.component'

describe('LayoutArticleWithParagraphsComponent', (): void => {
  let component: LayoutArticleWithParagraphsComponent
  let fixture: ComponentFixture<LayoutArticleWithParagraphsComponent>

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(LayoutArticleWithParagraphsComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    fixture.componentRef.setInput('paragraphs', ['Test data', 'Test data'])
    fixture.componentRef.setInput('titleText', 'Test data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
