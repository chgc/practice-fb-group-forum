
import { RouterConfig } from '@angular/router';
import { FavorComponent } from './';
import { CheckLogin } from '../shared/index';

export const FavorRoutes: RouterConfig = [
  {
    path: 'favor',
    component: FavorComponent,
    canActivate: [CheckLogin]
  }
];
