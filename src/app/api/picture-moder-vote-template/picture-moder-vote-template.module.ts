import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {APIPictureModerVoteTemplateService} from './picture-moder-vote-template.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [APIPictureModerVoteTemplateService],
})
export class APIPictureModerVoteTemplateModule {}
