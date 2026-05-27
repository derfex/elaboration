import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-vue-logotype',
  styleUrl: './vue-logotype.component.sass',
  templateUrl: './vue-logotype.component.svg',
})
export class VueLogotypeComponent {}
