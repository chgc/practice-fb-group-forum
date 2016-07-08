import { RouterConfig } from '@angular/router';
import { PostComponent } from './';
import { PostListComponent } from './post-list';
export const PostRoutes: RouterConfig = [
    {
        path: 'posts',
        component: PostComponent,
        children: [{
            path: '',
            component: PostListComponent
        }]
    }
];