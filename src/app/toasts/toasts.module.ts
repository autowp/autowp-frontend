import {NgModule} from '@angular/core';
import {ContainerComponent} from './container/container.component';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastsService} from './toasts.service';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [ContainerComponent],
  imports: [NgbToastModule, CommonModule],
  exports: [ContainerComponent],
  providers: [ToastsService],
})
export class ToastsModule {}
