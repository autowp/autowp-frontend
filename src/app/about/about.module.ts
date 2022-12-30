import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AboutRoutingModule} from './about-routing.module';
import {AboutComponent} from './about.component';
import {NgPipesModule} from 'ngx-pipes';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, NgPipesModule],
})
export class AboutModule {}
