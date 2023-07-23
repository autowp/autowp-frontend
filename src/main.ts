import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from '@environment/environment';
import * as Sentry from '@sentry/angular-ivy';

import {AppModule} from './app/app.module';
import version from './version.json';

if (environment.production) {
  enableProdMode();
}

Sentry.init({
  dsn: environment.sentry.dsn,
  environment: environment.sentry.environment,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.routingInstrumentation,
      tracePropagationTargets: [environment.apiUrl],
    }),
    new Sentry.Replay(),
  ],
  release: version.release,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  tracesSampleRate: 1.0,
});

platformBrowserDynamic()
  .bootstrapModule(AppModule, {preserveWhitespaces: true})
  .catch((err) => console.log(err));
