import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-github-invertocat-logotype',
  styleUrl: './github-invertocat-logotype.component.sass',
  templateUrl: './github-invertocat-logotype.component.svg',
})
export class GitHubInvertocatLogotypeComponent {}
