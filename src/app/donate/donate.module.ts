import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {ItemOfDayModule} from '../item-of-day/item-of-day.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {UserModule} from '../user/user.module';
import {DonateComponent} from './donate.component';
import {DonateService} from './donate.service';
import {DonateRoutingModule} from './donate-routing.module';
import {DonateLogComponent} from './log/log.component';
import {DonateSuccessComponent} from './success/success.component';
import {DonateVodSelectItemComponent} from './vod/select/item/item.component';
import {DonateVodSelectComponent} from './vod/select/select.component';
import {DonateVodSuccessComponent} from './vod/success/success.component';
import {DonateVodComponent} from './vod/vod.component';

@NgModule({
  declarations: [
    DonateComponent,
    DonateLogComponent,
    DonateSuccessComponent,
    DonateVodComponent,
    DonateVodSelectComponent,
    DonateVodSelectItemComponent,
    DonateVodSuccessComponent,
  ],
  imports: [
    CommonModule,
    DonateRoutingModule,
    UserModule,
    UtilsModule,
    NgbTooltipModule,
    PaginatorModule,
    FormsModule,
    ItemOfDayModule,
    ReactiveFormsModule,
  ],
  providers: [DonateService],
})
export class DonateModule {}
