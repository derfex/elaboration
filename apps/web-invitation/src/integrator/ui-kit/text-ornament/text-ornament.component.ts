import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-text-ornament',
  styleUrl: './text-ornament.component.sass',
  templateUrl: './text-ornament.component.html',
})
export class TextOrnamentComponent {
  public readonly texts = input.required<readonly string[]>()
}
