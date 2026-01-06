import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-arrow-left-icon',
  styleUrl: './arrow-left-icon.component.sass',
  templateUrl: './arrow-left-icon.component.svg',
})
export class ArrowLeftIconComponent {}
