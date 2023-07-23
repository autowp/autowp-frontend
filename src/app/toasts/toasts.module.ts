import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';

import {ContainerComponent} from './container/container.component';
import {ToastsService} from './toasts.service';

@NgModule({
  declarations: [ContainerComponent],
  exports: [ContainerComponent],
  imports: [NgbToastModule, CommonModule],
  providers: [ToastsService],
})
export class ToastsModule {}
