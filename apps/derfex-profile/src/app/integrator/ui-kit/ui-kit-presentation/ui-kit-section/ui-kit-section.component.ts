import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { LayoutSectionUtil } from '~ui-kit/layout/layout-section.util'
import { UIKitPresentationComponent } from '~ui-kit/ui-kit-presentation/ui-kit-presentation/ui-kit-presentation.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UIKitPresentationComponent],
  selector: 'app-ui-kit-section',
  styleUrl: './ui-kit-section.component.sass',
  templateUrl: './ui-kit-section.component.html',
})
export class UIKitSectionComponent {
  public readonly number = input.required<number>()

  protected readonly numberText = computed<string>(() => LayoutSectionUtil.convertNumber(this.number()))
}
