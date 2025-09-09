import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  selector: 'app-root',
  styleUrl: './app.sass',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = 'derfex-profile'
}
