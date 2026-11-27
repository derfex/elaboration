import type { Routes } from '@angular/router'

export const appRoutes: Routes = [
  {
    loadComponent: () => import('~pages/home-page/home-page.component').then((c) => c.HomePageComponent),
    path: '',
    title: 'Elaboration: Angular. Pet-shop',
  },
  {
    loadComponent: () =>
      import('~pages/nx-welcome-page/nx-welcome-page.component').then((c) => c.NxWelcomePageComponent),
    path: 'nx-welcome',
    title: 'Elaboration: Angular. NX welcome',
  },
]
