import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureModerVoteComponent } from './picture-moder-vote/picture-moder-vote.component';
import { PictureModerVoteModalComponent } from './picture-moder-vote/modal/modal.component';
import { UserModule } from '../user/user.module';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { APIPictureModerVoteTemplateModule } from '../api/picture-moder-vote-template/picture-moder-vote-template.module';

@NgModule({
  declarations: [PictureModerVoteComponent, PictureModerVoteModalComponent],
  imports: [
    CommonModule,
    UserModule,
    FormsModule,
    NgbDropdownModule,
    APIPictureModerVoteTemplateModule,
    NgbModalModule
  ],
  entryComponents: [PictureModerVoteModalComponent],
  exports: [PictureModerVoteComponent]
})
export class PictureModerVoteModule {}
