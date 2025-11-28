import { ChangeDetectionStrategy, Component, input } from '@angular/core'

// TODO: unused.
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout-article-with-paragraphs',
  styleUrl: './layout-article-with-paragraphs.component.sass',
  templateUrl: './layout-article-with-paragraphs.component.html',
})
export class LayoutArticleWithParagraphsComponent {
  public readonly paragraphs = input.required<readonly string[]>()
  public readonly titleText = input.required<string>()
}
