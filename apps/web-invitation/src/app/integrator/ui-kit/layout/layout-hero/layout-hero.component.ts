import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout-hero',
  styleUrl: './layout-hero.component.sass',
  templateUrl: './layout-hero.component.html',
})
export class LayoutHeroComponent {
  public readonly title = input.required<string>()
}
