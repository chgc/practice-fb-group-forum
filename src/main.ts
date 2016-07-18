import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { AppComponent, environment, APP_ROUTER_PROVIDERS, APP_PROVIDERS } from './app/';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

import { postReducer } from './app/post/shared/postReducer';
import { FavorReducer } from './app/favor/shared/favor.reducer';
import { FbService } from './app/post/shared';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  ...APP_PROVIDERS,
  provideStore({
    posts: postReducer,
    favors: FavorReducer
  }),
  provide(PLATFORM_DIRECTIVES, {
    useValue: [ROUTER_DIRECTIVES],
    multi: true
  }),
  FIREBASE_PROVIDERS,
  // Initialize Firebase app
  defaultFirebase({
    apiKey: "AIzaSyAaH5ixnZzy-V9QcuUOmfY6h_Z9_KT3esQ",
    authDomain: "fbforum-ef469.firebaseapp.com",
    databaseURL: "https://fbforum-ef469.firebaseio.com",
    storageBucket: "fbforum-ef469.appspot.com",
  })
]);

