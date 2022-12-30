import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
// import * as Sentry from "@sentry/angular";
// import {BrowserTracing} from '@sentry/tracing';

if (environment.production) {
  enableProdMode();
}

// const version = require('./version.json')

/*Sentry.init({
  dsn: environment.sentry.dsn,
  environment: environment.sentry.environment,
  release: version.release,
  integrations: [
    new BrowserTracing({
      tracingOrigins: [environment.apiUrl],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],
  tracesSampleRate: 1.0,
});*/

platformBrowserDynamic()
  .bootstrapModule(AppModule, {preserveWhitespaces: true})
  .catch((err) => console.log(err));
