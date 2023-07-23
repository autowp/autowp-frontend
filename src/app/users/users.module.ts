import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {APICommentsModule} from '../api/comments/comments.module';
import {MessageDialogModule} from '../message-dialog/message-dialog.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {UserModule} from '../user/user.module';
import {UsersRatingComponent} from './rating/rating.component';
import {UsersUserCommentsComponent} from './user/comments/comments.component';
import {UsersUserPicturesBrandComponent} from './user/pictures/brand/brand.component';
import {UsersUserPicturesComponent} from './user/pictures/pictures.component';
import {UsersUserComponent} from './user/user.component';
import {UsersRoutingModule} from './users-routing.module';

@NgModule({
  declarations: [
    UsersRatingComponent,
    UsersUserComponent,
    UsersUserCommentsComponent,
    UsersUserPicturesComponent,
    UsersUserPicturesBrandComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgbTooltipModule,
    UserModule,
    FormsModule,
    PaginatorModule,
    ThumbnailModule,
    MessageDialogModule,
    APICommentsModule,
    UtilsModule,
  ],
})
export class UsersModule {}
