import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NxWelcome } from './nx-welcome'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, NxWelcome],
  selector: 'app-root',
  styleUrl: './app.sass',
  templateUrl: './app.html',
})
export class App {
  protected title = 'web-invitation'
}
