import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-css-logotype',
  styleUrl: './css-logotype.component.sass',
  templateUrl: './css-logotype.component.svg',
})
export class CSSLogotypeComponent {}
