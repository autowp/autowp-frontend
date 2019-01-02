import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIAttrsService } from './attrs.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [APIAttrsService]
})
export class APIAttrsModule {}
