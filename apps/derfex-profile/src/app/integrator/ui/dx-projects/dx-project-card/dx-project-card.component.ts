import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { GitHubInvertocatLogotypeComponent } from '~ui/dx-contacts/logotypes/github-invertocat-logotype/github-invertocat-logotype.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GitHubInvertocatLogotypeComponent],
  selector: 'app-dx-project-card',
  styleUrl: './dx-project-card.component.sass',
  templateUrl: './dx-project-card.component.html',
})
export class DXProjectCardComponent {
  public readonly title = input.required<string>()
  public readonly resultURL = input.required<string>()
  public readonly sourceURL = input.required<string>()
}
