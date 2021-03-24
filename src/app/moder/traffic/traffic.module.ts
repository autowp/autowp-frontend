import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrafficRoutingModule } from './traffic-routing.module';
import { ModerTrafficWhitelistComponent } from './whitelist/whitelist.component';
import { ModerTrafficComponent } from './traffic.component';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from '../../user/user.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModerTrafficWhitelistComponent,
    ModerTrafficComponent
  ],
  imports: [
    CommonModule,
    TrafficRoutingModule,
    HttpClientModule,
    UserModule,
    TranslateModule
  ]
})
export class TrafficModule { }
