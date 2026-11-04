// # External modules
import { provideHttpClient } from '@angular/common/http'
import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter } from '@angular/router'

// # Internal modules
import { appRoutes } from '~app/app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(appRoutes),
  ],
}
