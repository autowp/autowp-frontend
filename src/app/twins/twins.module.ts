import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwinsRoutingModule } from './twins-routing.module';
import { TwinsItemComponent } from './item/item.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule } from '../utils/utils.module';
import { TwinsGroupPicturesThumbnailComponent } from './thumbnail/thumbnail.component';
import { UserModule } from '../user/user.module';
import { TwinsSidebarComponent } from './sidebar.component';
import { TwinsGroupPicturesComponent } from './twins-group-pictures.component';
import { TwinsGroupSpecificationsComponent } from './twins-group-specifications.component';
import { TwinsGroupComponent } from './twins-group.component';
import { CommentsModule } from '../comments/comments.module';
import { TwinsComponent } from './twins.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { TwinsService } from './twins.service';
import { TwinsGroupPictureComponent } from './twins-group-picture/twins-group-picture.component';
import { NgPipesModule } from 'ngx-pipes';
import { MomentModule } from 'ngx-moment';
import { NgbTooltipModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ModerModule } from '../moder/moder.module';
import { PictureModerVoteModule } from '../picture-moder-vote/picture-moder-vote.module';
import { ShareModule } from '../share/share.module';
import { TwinsGroupGalleryComponent } from './twins-group-gallery/twins-group-gallery.component';
import { GalleryModule } from '../gallery/gallery.module';

@NgModule({
  declarations: [
    TwinsItemComponent,
    TwinsGroupPicturesThumbnailComponent,
    TwinsSidebarComponent,
    TwinsGroupPicturesComponent,
    TwinsGroupSpecificationsComponent,
    TwinsGroupComponent,
    TwinsComponent,
    TwinsGroupPictureComponent,
    TwinsGroupGalleryComponent
  ],
  imports: [
    CommonModule,
    TwinsRoutingModule,
    TranslateModule,
    UtilsModule,
    UserModule,
    CommentsModule,
    PaginatorModule,
    NgPipesModule,
    MomentModule,
    NgbTooltipModule,
    NgbDropdownModule,
    ModerModule,
    PictureModerVoteModule,
    ShareModule,
    GalleryModule
  ],
  providers: [
    TwinsService
  ]
})
export class TwinsModule {}
