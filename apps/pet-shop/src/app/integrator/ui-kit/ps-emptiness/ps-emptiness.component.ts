import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ps-emptiness',
  styleUrl: './ps-emptiness.component.sass',
  templateUrl: './ps-emptiness.component.html',
})
export class PSEmptinessComponent {
  protected caption = 'No data to display'

  @Input()
  public set text(caption: string) {
    this.caption = caption
  }

  public get text(): string {
    return this.caption
  }
}
