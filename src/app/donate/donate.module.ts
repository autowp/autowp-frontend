import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonateRoutingModule } from './donate-routing.module';
import { DonateLogComponent } from './log/log.component';
import { DonateSuccessComponent } from './success/success.component';
import { DonateVodComponent } from './vod/vod.component';
import { DonateVodSelectComponent } from './vod/select/select.component';
import { DonateVodSelectItemComponent } from './vod/select/item/item.component';
import { DonateVodSuccessComponent } from './vod/success/success.component';
import { MomentModule } from 'ngx-moment';
import { UserModule } from '../user/user.module';
import { UtilsModule } from '../utils/utils.module';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from '../paginator/paginator.module';
import { FormsModule } from '@angular/forms';
import { ItemOfDayModule } from '../item-of-day/item-of-day.module';
import { DonateComponent } from './donate.component';
import { DonateService } from './donate.service';
import { NgbTooltipModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DonateComponent,
    DonateLogComponent,
    DonateSuccessComponent,
    DonateVodComponent,
    DonateVodSelectComponent,
    DonateVodSelectItemComponent,
    DonateVodSuccessComponent
  ],
  imports: [
    CommonModule,
    DonateRoutingModule,
    MomentModule,
    UserModule,
    UtilsModule,
    TranslateModule,
    NgbTooltipModule,
    NgbButtonsModule,
    PaginatorModule,
    FormsModule,
    ItemOfDayModule
  ],
  providers: [DonateService]
})
export class DonateModule {}
