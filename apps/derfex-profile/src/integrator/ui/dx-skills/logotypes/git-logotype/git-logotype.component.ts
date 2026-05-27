import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-git-logotype',
  styleUrl: './git-logotype.component.sass',
  templateUrl: './git-logotype.component.svg',
})
export class GitLogotypeComponent {}
