import type { Routes } from '@angular/router'

export const appRoutes: Routes = [
  {
    loadComponent: () => import('~pages/home-page/home-page.component').then((c) => c.HomePageComponent),
    path: '',
    title: 'Pet-shop | Elaboration. Angular',
  },
  {
    loadComponent: () =>
      import('~pages/nx-welcome-page/nx-welcome-page.component').then((c) => c.NxWelcomePageComponent),
    path: 'nx-welcome',
    title: 'NX welcome | Elaboration. Angular',
  },
]
