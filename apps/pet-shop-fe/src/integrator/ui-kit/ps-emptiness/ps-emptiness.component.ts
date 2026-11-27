import { Component, input } from '@angular/core'

@Component({
  selector: 'app-ps-emptiness',
  styleUrl: './ps-emptiness.component.sass',
  templateUrl: './ps-emptiness.component.html',
})
export class PSEmptinessComponent {
  public readonly text = input('No data to display')
}
