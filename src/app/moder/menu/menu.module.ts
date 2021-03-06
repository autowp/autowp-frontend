import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { APICommentsModule } from '../../api/comments/comments.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([]),
    NgbDropdownModule,
    APICommentsModule
  ],
  exports: [MenuComponent]
})
export class ModerMenuModule { }
