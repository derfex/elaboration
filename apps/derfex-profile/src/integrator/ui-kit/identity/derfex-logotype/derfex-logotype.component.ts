import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-derfex-logotype',
  styleUrl: './derfex-logotype.component.sass',
  templateUrl: './derfex-logotype.component.svg',
})
export class DerfexLogotypeComponent {}
