import { provideRouter, RouterConfig } from '@angular/router';
import { PostComponent, PostRoutes } from './post';

export const routes: RouterConfig = [
  ...PostRoutes,
  {
    path: '**',
    redirectTo: 'posts/'
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
