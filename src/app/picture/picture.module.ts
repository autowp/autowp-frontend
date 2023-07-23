import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbDropdownModule, NgbProgressbarModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';
import {NgPipesModule} from 'ngx-pipes';

import {CommentsModule} from '../comments/comments.module';
import {GalleryModule} from '../gallery/gallery.module';
import {PicturesModule} from '../moder/pictures/pictures.module';
import {PictureModerVoteModule} from '../picture-moder-vote/picture-moder-vote.module';
import {ShareModule} from '../share/share.module';
import {UserModule} from '../user/user.module';
import {PicturePaginatorComponent} from './paginator.component';
import {PictureComponent} from './picture.component';
import {PicturePageComponent} from './picture-page.component';
import {PictureRoutingModule} from './picture-routing.module';

@NgModule({
  declarations: [PictureComponent, PicturePaginatorComponent, PicturePageComponent],
  exports: [PictureComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserModule,
    NgbTooltipModule,
    NgPipesModule,
    UtilsModule,
    ShareModule,
    PictureModerVoteModule,
    NgbDropdownModule,
    CommentsModule,
    PictureRoutingModule,
    GalleryModule,
    PicturesModule,
    NgbProgressbarModule,
  ],
})
export class PictureModule {}
