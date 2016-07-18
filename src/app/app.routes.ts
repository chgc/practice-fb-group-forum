import { provideRouter, RouterConfig } from '@angular/router';
import { PostComponent, PostRoutes } from './post';
import { BlackListRoutes } from './black-list';
import { FavorRoutes } from './favor';

export const routes: RouterConfig = [
  ...PostRoutes,
  ...BlackListRoutes,
  ...FavorRoutes,
  {
    path: '**',
    redirectTo: 'posts'
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
