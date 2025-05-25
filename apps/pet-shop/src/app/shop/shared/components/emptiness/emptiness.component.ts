import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-emptiness',
  styleUrls: ['./emptiness.component.sass'],
  templateUrl: './emptiness.component.html',
})
export class EmptinessComponent {
  protected caption = 'No data to display';

  @Input()
  public set text(caption: string) {
    this.caption = caption;
  }

  public get text(): string {
    return this.caption;
  }
}
