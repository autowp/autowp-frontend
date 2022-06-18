import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Sentry from "@sentry/angular";

if (environment.production) {
  enableProdMode();
}

Sentry.init({
  dsn: environment.sentry.dsn,
  environment: environment.sentry.environment
});

platformBrowserDynamic().bootstrapModule(AppModule, { preserveWhitespaces: true })
  .catch(err => console.log(err));
