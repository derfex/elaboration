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
    fixture.componentRef.setInput('paragraphs', ['No data', 'No data'])
    fixture.componentRef.setInput('titleText', 'No data')
    // TODO?: fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
