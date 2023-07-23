import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {CommentsModule} from '../comments/comments.module';
import {GalleryModule} from '../gallery/gallery.module';
import {ModerModule} from '../moder/moder.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {PictureModule} from '../picture/picture.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {UserModule} from '../user/user.module';
import {TwinsItemComponent} from './item/item.component';
import {TwinsSidebarComponent} from './sidebar.component';
import {TwinsComponent} from './twins.component';
import {TwinsGroupGalleryComponent} from './twins-group/gallery/twins-group-gallery.component';
import {TwinsGroupItemsComponent} from './twins-group/items/items.component';
import {TwinsGroupPicturesListComponent} from './twins-group/pictures/list/list.component';
import {TwinsGroupPictureComponent} from './twins-group/pictures/picture/picture.component';
import {TwinsGroupSpecificationsComponent} from './twins-group/specifications/specifications.component';
import {TwinsGroupComponent} from './twins-group/twins-group.component';
import {TwinsRoutingModule} from './twins-routing.module';

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
