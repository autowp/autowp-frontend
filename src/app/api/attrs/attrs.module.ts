import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {APIAttrsService} from './attrs.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [APIAttrsService],
})
export class APIAttrsModule {}
