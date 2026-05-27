// # External modules
import { provideHttpClient, withFetch } from '@angular/common/http'
import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'

// # Internal modules
import { appRoutes } from '~app/app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideRouter(appRoutes),
    provideZonelessChangeDetection(),
  ],
}
