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
    path: 'movie/:id',
    loadComponent: () =>
      import('./pages/billboard/components/movie-card/movie.component').then(
        (m) => m.MovieCardComponent
      ),
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
