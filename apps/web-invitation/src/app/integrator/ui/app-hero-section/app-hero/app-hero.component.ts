import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero',
  styleUrl: './app-hero.component.sass',
  templateUrl: './app-hero.component.html',
})
export class AppHeroComponent {
  public readonly phraseText = input.required<string>()
}
