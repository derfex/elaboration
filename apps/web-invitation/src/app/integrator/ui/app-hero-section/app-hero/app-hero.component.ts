import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  selector: 'app-hero',
  styleUrl: './app-hero.component.sass',
  templateUrl: './app-hero.component.html',
})
export class AppHeroComponent {
  public readonly illustrationImageAltText = input.required<string>()
  public readonly illustrationImageHeight = input.required<number>()
  public readonly illustrationImageURL = input.required<string>()
  public readonly illustrationImageWidth = input.required<number>()
  public readonly phraseText = input.required<string>()

  protected readonly illustrationIsShown = computed<boolean>(() => {
    return this.illustrationImageHeight() > 0
  })
}
