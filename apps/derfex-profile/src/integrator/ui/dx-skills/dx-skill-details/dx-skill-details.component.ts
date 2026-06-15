import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dx-skill-details',
  styleUrl: './dx-skill-details.component.sass',
  templateUrl: './dx-skill-details.component.html',
})
export class DXSkillDetailsComponent {
  public readonly name = input.required<string>()
  public readonly referenceURL = input.required<string>()
  public readonly referenceURLText = input.required<string>()
  public readonly shortDescription = input.required<string>()

  protected readonly externalLinkText = '🡥'
}
