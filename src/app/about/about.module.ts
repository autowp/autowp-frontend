import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgPipesModule} from 'ngx-pipes';

import {AboutComponent} from './about.component';
import {AboutRoutingModule} from './about-routing.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, NgPipesModule],
})
export class AboutModule {}
