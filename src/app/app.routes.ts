import { provideRouter, RouterConfig } from '@angular/router';
import { PostComponent, PostRoutes } from './post';
import { BlackListRoutes } from './black-list';

export const routes: RouterConfig = [
  ...PostRoutes,
  ...BlackListRoutes,
  {
    path: '**',
    redirectTo: 'posts'
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
