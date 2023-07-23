import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {APIPictureModerVoteTemplateModule} from '../api/picture-moder-vote-template/picture-moder-vote-template.module';
import {UserModule} from '../user/user.module';
import {PictureModerVoteModalComponent} from './picture-moder-vote/modal/modal.component';
import {PictureModerVoteComponent} from './picture-moder-vote/picture-moder-vote.component';

@NgModule({
  declarations: [PictureModerVoteComponent, PictureModerVoteModalComponent],
  exports: [PictureModerVoteComponent],
  imports: [
    CommonModule,
    UserModule,
    FormsModule,
    NgbDropdownModule,
    APIPictureModerVoteTemplateModule,
    NgbModalModule,
  ],
})
export class PictureModerVoteModule {}
