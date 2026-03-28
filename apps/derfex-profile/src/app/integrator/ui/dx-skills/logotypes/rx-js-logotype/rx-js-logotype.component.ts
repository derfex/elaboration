import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-rx-js-logotype',
  styleUrl: './rx-js-logotype.component.sass',
  templateUrl: './rx-js-logotype.component.svg',
})
export class RxJSLogotypeComponent {}
