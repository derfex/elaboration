import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ps-emptiness',
  styleUrl: './ps-emptiness.component.sass',
  templateUrl: './ps-emptiness.component.html',
})
export class PSEmptinessComponent {
  public readonly text = input('No data to display')
}
