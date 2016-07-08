import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { AppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { postReducer } from './app/post/shared/postReducer';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  provideStore({ posts: postReducer }),
  provide(PLATFORM_DIRECTIVES, {
    useValue: [ROUTER_DIRECTIVES],
    multi: true
  })
]);

