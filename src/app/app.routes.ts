import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/billboard/billboard.component').then(
        (m) => m.BillboardComponent
      ),
  },
  {
    path: 'my-list',
    data: {
      favorites: true,
    },
    loadComponent: () =>
      import('./pages/billboard/billboard.component').then(
        (m) => m.BillboardComponent
      ),
  },
  {
    path: 'watch/:movieId',
    loadComponent: () =>
      import('./pages/watch/watch.component').then((m) => m.WatchComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
