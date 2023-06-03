import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogRoutingModule} from './log-routing.module';
import {LogComponent} from './log.component';
import {PaginatorModule} from '../paginator/paginator.module';
import {UserModule} from '../user/user.module';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

@NgModule({
  declarations: [LogComponent],
  imports: [CommonModule, LogRoutingModule, PaginatorModule, UserModule, NgbTooltipModule, UtilsModule],
})
export class LogModule {}
