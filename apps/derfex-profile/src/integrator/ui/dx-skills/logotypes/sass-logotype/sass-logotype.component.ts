import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sass-logotype',
  styleUrl: './sass-logotype.component.sass',
  templateUrl: './sass-logotype.component.svg',
})
export class SASSLogotypeComponent {}
