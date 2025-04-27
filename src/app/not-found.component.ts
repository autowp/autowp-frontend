import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: '<h2 i18n>Page not found</h2>',
})
export class PageNotFoundComponent {}
