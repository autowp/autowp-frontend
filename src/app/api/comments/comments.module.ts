import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {APICommentsService} from './comments.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [APICommentsService],
})
export class APICommentsModule {}
