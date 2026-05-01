import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { MainLayout } from './layout/main-layout/main-layout';

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
        loadComponent: () =>
          import('./features/investments/pages/investments/investments')
            .then(m => m.Investments)
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./features/messages/pages/messages/messages')
            .then(m => m.Messages)
      },

      {
        path: 'notifications',
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