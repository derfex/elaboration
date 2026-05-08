import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  selector: 'app-dress-code',
  styleUrl: './dress-code.component.sass',
  templateUrl: './dress-code.component.html',
})
export class DressCodeComponent {
  public readonly descriptionParagraphs = input.required<readonly string[]>()
  public readonly illustrationImageAltText = input.required<string>()
  public readonly illustrationImageHeight = input.required<number>()
  public readonly illustrationImageURL = input.required<string>()
  public readonly illustrationImageWidth = input.required<number>()
  public readonly tints = input.required<readonly string[]>()
  public readonly titleText = input.required<string>()

  protected readonly illustrationIsShown = computed<boolean>(() => {
    return this.illustrationImageHeight() > 0
  })
  protected readonly tintsForTemplate = computed<readonly TintForTemplate[]>(() => {
    return this.tints().map((text: string): TintForTemplate => {
      const style = `background-color: ${text}`
      return {
        style,
        text,
      }
    })
  })
}

interface TintForTemplate {
  readonly style: string
  readonly text: string
}
