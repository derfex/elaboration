import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-node-js-logotype',
  styleUrl: './node-js-logotype.component.sass',
  templateUrl: './node-js-logotype.component.svg',
})
export class NodeJSLogotypeComponent {}
