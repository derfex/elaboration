import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-svg-logotype',
  styleUrl: './svg-logotype.component.sass',
  templateUrl: './svg-logotype.component.svg',
})
export class SVGLogotypeComponent {}
