import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-github-logotype',
  styleUrl: './github-logotype.component.sass',
  templateUrl: './github-logotype.component.svg',
})
export class GitHubLogotypeComponent {}
