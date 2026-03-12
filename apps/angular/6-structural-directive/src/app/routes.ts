import { canMatch } from './guard';
import { ROLE } from './user.model';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [canMatch([])],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [canMatch([ROLE.MANAGER])],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./dashboard/notFound.component').then(
        (m) => m.NotFoundDashboardComponent,
      ),
  },
];
