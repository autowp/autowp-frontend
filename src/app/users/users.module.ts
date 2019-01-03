import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersUserPicturesBrandComponent } from './user/pictures/brand/brand.component';
import { UsersUserPicturesComponent } from './user/pictures/pictures.component';
import { UsersUserCommentsComponent } from './user/comments/comments.component';
import { UsersUserComponent } from './user/user.component';
import { UsersRatingComponent } from './rating/rating.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { UserModule } from '../user/user.module';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from '../paginator/paginator.module';
import { ThumbnailModule } from '../thumbnail/thumbnail.module';
import { MessageDialogModule } from '../message-dialog/message-dialog.module';
import { APICommentsModule } from '../api/comments/comments.module';

@NgModule({
  declarations: [
    UsersRatingComponent,
    UsersUserComponent,
    UsersUserCommentsComponent,
    UsersUserPicturesComponent,
    UsersUserPicturesBrandComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TranslateModule,
    NgbTooltipModule,
    MomentModule,
    UserModule,
    FormsModule,
    PaginatorModule,
    ThumbnailModule,
    MessageDialogModule,
    APICommentsModule
  ]
})
export class UsersModule {}
