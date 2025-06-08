import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {}
