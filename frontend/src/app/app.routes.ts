import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { MainLayout } from './layout/main-layout/main-layout';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
        import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes')
            .then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'startups/create',   
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ROLE_FOUNDER'] },
        loadComponent: () =>
          import('./features/startups/pages/create-startup/create-startup')
            .then(m => m.CreateStartup)
      },
      {
        path: 'startups',
        loadComponent: () =>
          import('./features/startups/pages/startups/startups')
            .then(m => m.Startups)
      },
      {
        path: 'investments',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ROLE_INVESTOR'] },
        loadComponent: () =>
          import('./features/investments/pages/investments/investments')
            .then(m => m.Investments)
      },
      {
        path: 'messages',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ROLE_FOUNDER', 'ROLE_INVESTOR', 'ROLE_COFUNDER'] },
        loadComponent: () =>
          import('./features/messages/pages/messages/messages')
            .then(m => m.Messages)
      },

      {
        path: 'notifications',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ROLE_FOUNDER', 'ROLE_INVESTOR', 'ROLE_COFUNDER'] },
        loadComponent: () =>
          import('./features/notifications/pages/notifications/notifications')
            .then(m => m.Notifications)
      },

      {
        path: 'teams',
        loadComponent: () =>
          import('./features/teams/pages/teams/teams')
            .then(m => m.Teams)
      },

      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.routes')
            .then(m => m.PROFILE_ROUTES)
      }


      
      
    ]
  },
  
  
  {
    path: '**',
    redirectTo: 'auth/login'
  }
  
];