import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {APIPerspectiveService} from './perspective.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [APIPerspectiveService],
})
export class APIPerspectiveModule {}
