import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/blank/blank.component').then(
        (a) => a.BlankComponent
      ),
  },
  {
    path: 'formarray',
    loadComponent: () =>
      import('./components/formarray/formarray.component').then(
        (a) => a.FormarrayComponent
      ),
  },
];
