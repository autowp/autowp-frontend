import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotlinksRoutingModule } from './hotlinks-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HotlinksService } from './hotlinks.service';
import { ModerHotlinksComponent } from './hotlinks.component';

@NgModule({
  declarations: [ModerHotlinksComponent],
  imports: [
    CommonModule,
    HotlinksRoutingModule,
    HttpClientModule
  ],
  providers: [
    HotlinksService
  ]
})
export class HotlinksModule { }
