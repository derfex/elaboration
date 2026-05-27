import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-javascript-logotype',
  styleUrl: './javascript-logotype.component.sass',
  templateUrl: './javascript-logotype.component.svg',
})
export class JavaScriptLogotypeComponent {}
