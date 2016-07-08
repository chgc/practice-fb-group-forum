import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { AppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';
import { ROUTER_DIRECTIVES } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  provide(PLATFORM_DIRECTIVES, {
    useValue: [ROUTER_DIRECTIVES],
    multi: true
  })
]);

