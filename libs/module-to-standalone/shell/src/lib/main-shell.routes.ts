import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/home').then(
        (m) => m.HomeComponent,
      ),
  },
  {
    path: 'admin',
    canActivate: [IsAuthorizedGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@angular-challenges/module-to-standalone/admin/feature').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'create-user',
        loadComponent: () =>
          import('@angular-challenges/module-to-standalone/admin/feature').then(
            (m) => m.CreateUserComponent,
          ),
      },
    ],
  },
  {
    path: 'user',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/user/shell').then(
        (m) => m.UserShellComponent,
      ),
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@angular-challenges/module-to-standalone/user/home').then(
                (m) => m.UserHomeComponent,
              ),
          },
        ],
      },
      {
        path: 'contact',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                '@angular-challenges/module-to-standalone/user/contact'
              ).then((m) => m.ContactDashboardComponent),
          },
          {
            path: 'create-contact',
            loadComponent: () =>
              import(
                '@angular-challenges/module-to-standalone/user/contact'
              ).then((m) => m.CreateContactComponent),
          },
        ],
      },
    ],
  },

  {
    path: 'forbidden',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/forbidden').then(
        (m) => m.ForbiddenModule,
      ),
  },
];
