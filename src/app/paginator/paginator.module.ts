import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PaginatorComponent} from './paginator/paginator.component';

@NgModule({
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent],
  imports: [CommonModule, RouterModule.forChild([])],
})
export class PaginatorModule {}
