import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-angular-logotype',
  styleUrl: './angular-logotype.component.sass',
  templateUrl: './angular-logotype.component.svg',
})
export class AngularLogotypeComponent {}
