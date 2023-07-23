import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {PaginatorModule} from '../paginator/paginator.module';
import {UserModule} from '../user/user.module';
import {LogComponent} from './log.component';
import {LogRoutingModule} from './log-routing.module';

@NgModule({
  declarations: [LogComponent],
  imports: [CommonModule, LogRoutingModule, PaginatorModule, UserModule, NgbTooltipModule, UtilsModule],
})
export class LogModule {}
