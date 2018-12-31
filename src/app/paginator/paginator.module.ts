import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([])
  ],
  exports: [
    PaginatorComponent
  ]
})
export class PaginatorModule { }
