import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {UserModule} from '../../user/user.module';
import {ModerTrafficComponent} from './traffic.component';
import {TrafficRoutingModule} from './traffic-routing.module';
import {ModerTrafficWhitelistComponent} from './whitelist/whitelist.component';

@NgModule({
  declarations: [ModerTrafficWhitelistComponent, ModerTrafficComponent],
  imports: [CommonModule, TrafficRoutingModule, HttpClientModule, UserModule],
})
export class TrafficModule {}
