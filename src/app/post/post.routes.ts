import { RouterConfig } from '@angular/router';
import { PostComponent } from './';
import { PostListComponent } from './post-list';
import { PostDetailComponent } from './post-detail';
import { CheckLogin } from '../shared/checkLogin';

export const PostRoutes: RouterConfig = [
    {
        path: 'posts',
        component: PostComponent,
        children: [
            { path: '', component: PostListComponent },
            {
                path: ':id', component: PostDetailComponent,
                canActivate: [CheckLogin]
            }
        ]
    }
];
