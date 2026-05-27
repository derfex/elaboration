import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ColorsPresentationComponent } from '~ui-kit/ui-kit-presentation/colors-presentation/colors-presentation.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ColorsPresentationComponent],
  selector: 'app-ui-kit-presentation',
  styleUrl: './ui-kit-presentation.component.sass',
  templateUrl: './ui-kit-presentation.component.html',
})
export class UIKitPresentationComponent {
  protected readonly descriptionText = 'Examples of the UI kit elements.'
  protected readonly titleText = 'UI kit presentation'

  protected readonly headingsSubsection = this.#generateHeadingsSubsection()

  #generateHeadingsSubsection(): HeadingsSubsection {
    return {
      heading2: 'Title text level 2',
      heading3: 'Title text level 3',
      heading4: 'Title text level 4',
      paragraph: 'Paragraph long text. '.repeat(20),
      title: 'Headings',
    }
  }
}

interface HeadingsSubsection {
  readonly heading2: string
  readonly heading3: string
  readonly heading4: string
  readonly paragraph: string
  readonly title: string
}
