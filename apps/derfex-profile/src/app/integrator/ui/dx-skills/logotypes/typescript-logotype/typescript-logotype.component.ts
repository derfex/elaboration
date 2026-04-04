import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-typescript-logotype',
  styleUrl: './typescript-logotype.component.sass',
  templateUrl: './typescript-logotype.component.svg',
})
export class TypeScriptLogotypeComponent {}
