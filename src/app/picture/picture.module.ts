import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture.component';
import { PicturePaginatorComponent } from './paginator.component';
import { RouterModule } from '@angular/router';
import { UserModule } from '../user/user.module';
import {NgbTooltipModule, NgbDropdownModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { NgPipesModule } from 'ngx-pipes/src/ng-pipes/ng-pipes.module';
import { UtilsModule } from '../utils/utils.module';
import { ShareModule } from '../share/share.module';
import { PictureModerVoteModule } from '../picture-moder-vote/picture-moder-vote.module';
import {PicturePageComponent} from './picture-page.component';
import {CommentsModule} from '../comments/comments.module';
import {PictureRoutingModule} from './picture-routing.module';
import {GalleryModule} from '../gallery/gallery.module';
import {PicturesModule} from '../moder/pictures/pictures.module';

@NgModule({
  declarations: [PictureComponent, PicturePaginatorComponent, PicturePageComponent],
    imports: [
        CommonModule,
        RouterModule,
        UserModule,
        NgbTooltipModule,
        MomentModule,
        NgPipesModule,
        UtilsModule,
        ShareModule,
        PictureModerVoteModule,
        NgbDropdownModule,
        CommentsModule,
        PictureRoutingModule,
        GalleryModule,
        PicturesModule,
        NgbProgressbarModule
    ],
  exports: [
    PictureComponent
  ]
})
export class PictureModule { }
