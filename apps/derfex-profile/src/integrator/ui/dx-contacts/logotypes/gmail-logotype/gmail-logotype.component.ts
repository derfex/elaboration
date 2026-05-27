import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-gmail-logotype',
  styleUrl: './gmail-logotype.component.sass',
  templateUrl: './gmail-logotype.component.svg',
})
export class GmailLogotypeComponent {}
