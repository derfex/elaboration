import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-telegram-icon',
  styleUrl: './telegram-icon.component.sass',
  templateUrl: './telegram-icon.component.svg',
})
export class TelegramIconComponent {}
