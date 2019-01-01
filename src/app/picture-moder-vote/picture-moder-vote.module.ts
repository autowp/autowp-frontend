import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureModerVoteComponent } from './picture-moder-vote/picture-moder-vote.component';
import { PictureModerVoteModalComponent } from './picture-moder-vote/modal/modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserModule } from '../user/user.module';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PictureModerVoteComponent, PictureModerVoteModalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    UserModule,
    FormsModule,
    NgbDropdownModule
  ],
  entryComponents: [PictureModerVoteModalComponent],
  exports: [PictureModerVoteComponent]
})
export class PictureModerVoteModule {}
