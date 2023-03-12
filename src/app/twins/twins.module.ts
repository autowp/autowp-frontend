import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TwinsRoutingModule} from './twins-routing.module';
import {TwinsItemComponent} from './item/item.component';
import {UtilsModule} from '@utils/utils.module';
import {UserModule} from '../user/user.module';
import {TwinsSidebarComponent} from './sidebar.component';
import {TwinsGroupPicturesComponent} from './twins-group-pictures.component';
import {TwinsGroupSpecificationsComponent} from './twins-group-specifications.component';
import {TwinsGroupComponent} from './twins-group.component';
import {CommentsModule} from '../comments/comments.module';
import {TwinsComponent} from './twins.component';
import {PaginatorModule} from '../paginator/paginator.module';
import {TwinsService} from './twins.service';
import {TwinsGroupPictureComponent} from './twins-group-picture/twins-group-picture.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {ModerModule} from '../moder/moder.module';
import {TwinsGroupGalleryComponent} from './twins-group-gallery/twins-group-gallery.component';
import {GalleryModule} from '../gallery/gallery.module';
import {PictureModule} from '../picture/picture.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';

@NgModule({
  declarations: [
    TwinsItemComponent,
    TwinsSidebarComponent,
    TwinsGroupPicturesComponent,
    TwinsGroupSpecificationsComponent,
    TwinsGroupComponent,
    TwinsComponent,
    TwinsGroupPictureComponent,
    TwinsGroupGalleryComponent,
  ],
  imports: [
    CommonModule,
    TwinsRoutingModule,
    UtilsModule,
    UserModule,
    CommentsModule,
    PaginatorModule,
    NgbDropdownModule,
    ModerModule,
    GalleryModule,
    PictureModule,
    ThumbnailModule,
  ],
  providers: [TwinsService],
})
export class TwinsModule {}
