import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APICommentsService } from './comments.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [APICommentsService]
})
export class APICommentsModule { }
