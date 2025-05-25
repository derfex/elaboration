import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    loadComponent: () =>
      import('./integrator/pages/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      ),
    path: '',
  },
  {
    loadComponent: () =>
      import(
        './integrator/pages/nx-welcome-page/nx-welcome-page.component'
      ).then((c) => c.NxWelcomePageComponent),
    path: 'angular-hello',
  },
];
