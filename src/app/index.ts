export * from './environment';
export * from './app.component';
export * from './app.routes';

import { CheckLogin, FbService } from './post/shared/index';

// Application wide providers
export const APP_PROVIDERS = [
    CheckLogin,
    FbService
];