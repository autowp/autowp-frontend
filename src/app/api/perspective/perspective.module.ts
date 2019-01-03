import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIPerspectiveService } from './perspective.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [APIPerspectiveService]
})
export class APIPerspectiveModule { }
