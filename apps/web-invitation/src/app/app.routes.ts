import { Route } from '@angular/router'

export const appRoutes: Route[] = [
  {
    loadComponent: () => import('~pages/root-page/root-page.component').then(c => c.RootPageComponent),
    path: '',
  },
]
