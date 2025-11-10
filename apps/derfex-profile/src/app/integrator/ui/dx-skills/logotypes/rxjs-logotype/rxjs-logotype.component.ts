import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-rxjs-logotype',
  styleUrl: './rxjs-logotype.component.sass',
  templateUrl: './rxjs-logotype.component.svg',
})
export class RxJSLogotypeComponent {}
