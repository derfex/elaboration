import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout-footer',
  styleUrl: './layout-footer.component.sass',
  templateUrl: './layout-footer.component.html',
})
export class LayoutFooterComponent {
  public readonly carefullyCraftedWithText = input.required<string>()
}
