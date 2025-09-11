import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-github-icon',
  styleUrl: './github-icon.component.sass',
  templateUrl: './github-icon.component.svg',
})
export class GitHubIconComponent {}
