// # Internal modules
import { ChangeDetectionStrategy, Component } from '@angular/core'

// # Internal modules
import { NxWelcomeComponent } from '~integrator/angular-example/nx-welcome/nx-welcome.component'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxWelcomeComponent],
  selector: 'app-nx-welcome-page',
  styleUrl: './nx-welcome-page.component.sass',
  templateUrl: './nx-welcome-page.component.html',
})
export class NxWelcomePageComponent {}
