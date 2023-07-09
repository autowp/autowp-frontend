import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from '@environment/environment';
import * as Sentry from '@sentry/angular-ivy';
import version from './version.json';

if (environment.production) {
  enableProdMode();
}

Sentry.init({
  dsn: environment.sentry.dsn,
  environment: environment.sentry.environment,
  release: version.release,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [environment.apiUrl],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

platformBrowserDynamic()
  .bootstrapModule(AppModule, {preserveWhitespaces: true})
  .catch((err) => console.log(err));
