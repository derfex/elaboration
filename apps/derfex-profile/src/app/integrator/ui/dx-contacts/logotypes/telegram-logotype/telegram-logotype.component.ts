import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-telegram-logotype',
  styleUrl: './telegram-logotype.component.sass',
  templateUrl: './telegram-logotype.component.svg',
})
export class TelegramLogotypeComponent {}
