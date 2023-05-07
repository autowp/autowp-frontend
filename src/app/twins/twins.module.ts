import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TwinsRoutingModule} from './twins-routing.module';
import {TwinsItemComponent} from './item/item.component';
import {UtilsModule} from '@utils/utils.module';
import {UserModule} from '../user/user.module';
import {TwinsSidebarComponent} from './sidebar.component';
import {TwinsGroupPicturesListComponent} from './twins-group/pictures/list/list.component';
import {TwinsGroupSpecificationsComponent} from './twins-group/specifications/specifications.component';
import {TwinsGroupComponent} from './twins-group/twins-group.component';
import {CommentsModule} from '../comments/comments.module';
import {TwinsComponent} from './twins.component';
import {PaginatorModule} from '../paginator/paginator.module';
import {TwinsGroupPictureComponent} from './twins-group/pictures/picture/picture.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {ModerModule} from '../moder/moder.module';
import {TwinsGroupGalleryComponent} from './twins-group/gallery/twins-group-gallery.component';
import {GalleryModule} from '../gallery/gallery.module';
import {PictureModule} from '../picture/picture.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {TwinsGroupItemsComponent} from './twins-group/items/items.component';

@NgModule({
  declarations: [
    TwinsComponent,
    TwinsItemComponent,
    TwinsSidebarComponent,
    TwinsGroupComponent,
    TwinsGroupItemsComponent,
    TwinsGroupPicturesListComponent,
    TwinsGroupSpecificationsComponent,
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
})
export class TwinsModule {}
