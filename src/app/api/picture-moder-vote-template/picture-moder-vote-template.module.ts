import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIPictureModerVoteTemplateService } from './picture-moder-vote-template.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    APIPictureModerVoteTemplateService
  ]
})
export class APIPictureModerVoteTemplateModule { }
