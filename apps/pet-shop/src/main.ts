// # External modules
import { bootstrapApplication } from '@angular/platform-browser'

// # Internal modules
import { AppComponent } from '~app/app.component'
import { appConfig } from '~app/app.config'

bootstrapApplication(AppComponent, appConfig).catch((err: unknown): void =>
  console.error(err)
)
