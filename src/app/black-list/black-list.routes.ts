import { RouterConfig } from '@angular/router';
import { BlackListComponent } from './';
import { CheckLogin } from '../shared/index';

export const BlackListRoutes: RouterConfig = [
    {
        path: 'blacklist',
        component: BlackListComponent,
        canActivate: [CheckLogin]
    }
];
