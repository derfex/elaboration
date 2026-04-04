import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dx-skill-card',
  styleUrl: './dx-skill-card.component.sass',
  templateUrl: './dx-skill-card.component.html',
})
export class DXSkillCardComponent {
  public readonly titleAttribute = input.required<string>()
  public readonly url = input.required<string>()
}
