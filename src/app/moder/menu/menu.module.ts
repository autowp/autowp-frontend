import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import {APICommentsModule} from '../../api/comments/comments.module';
import {MenuComponent} from './menu/menu.component';

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [CommonModule, RouterModule.forChild([]), NgbDropdownModule, APICommentsModule],
})
export class ModerMenuModule {}
