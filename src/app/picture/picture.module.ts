import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture.component';
import { PicturePaginatorComponent } from './paginator.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserModule } from '../user/user.module';
import { NgbTooltipModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { NgPipesModule } from 'ngx-pipes';
import { UtilsModule } from '../utils/utils.module';
import { ShareModule } from '../share/share.module';
import { PictureModerVoteModule } from '../picture-moder-vote/picture-moder-vote.module';

@NgModule({
  declarations: [PictureComponent, PicturePaginatorComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    UserModule,
    NgbTooltipModule,
    MomentModule,
    NgPipesModule,
    UtilsModule,
    ShareModule,
    PictureModerVoteModule,
    NgbDropdownModule
  ],
  exports: [
    PictureComponent
  ]
})
export class PictureModule { }
