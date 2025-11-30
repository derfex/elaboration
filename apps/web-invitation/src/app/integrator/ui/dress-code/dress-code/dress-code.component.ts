import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dress-code',
  styleUrl: './dress-code.component.sass',
  templateUrl: './dress-code.component.html',
})
export class DressCodeComponent {
  public readonly descriptionParagraphs = input.required<readonly string[]>()
  public readonly tints = input.required<readonly string[]>()
  public readonly titleText = input.required<string>()

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
