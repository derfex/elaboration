import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  imports: [
    RouterModule,
  ],
  selector: 'app-root',
  standalone: true, // TODO: Can we delete `standalone: true` for Angular@19?
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {}
