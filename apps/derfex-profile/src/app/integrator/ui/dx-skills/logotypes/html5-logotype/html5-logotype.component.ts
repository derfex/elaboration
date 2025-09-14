import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-html5-logotype',
  styleUrl: './html5-logotype.component.sass',
  templateUrl: './html5-logotype.component.svg',
})
export class HTML5LogotypeComponent {}
