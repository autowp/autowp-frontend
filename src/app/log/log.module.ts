import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { LogComponent } from './log.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { UserModule } from '../user/user.module';
import { MomentModule } from 'ngx-moment';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [LogComponent],
  imports: [
    CommonModule,
    LogRoutingModule,
    PaginatorModule,
    UserModule,
    MomentModule,
    NgbTooltipModule,
    TranslateModule
  ]
})
export class LogModule {}
