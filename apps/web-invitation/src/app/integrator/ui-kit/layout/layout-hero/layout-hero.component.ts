import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout-hero',
  styleUrl: './layout-hero.component.sass',
  templateUrl: './layout-hero.component.html',
})
export class LayoutHeroComponent {
  public readonly appealText = input.required<string>()
  public readonly authorsSignatureLines = input.required<readonly string[]>()
  public readonly eventDateCaptionText = input.required<string>()
  public readonly eventDateValueText = input.required<string>()
  public readonly titleText = input.required<string>()
}
