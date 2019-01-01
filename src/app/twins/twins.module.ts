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

@NgModule({
  declarations: [
    TwinsItemComponent,
    TwinsGroupPicturesThumbnailComponent,
    TwinsSidebarComponent,
    TwinsGroupPicturesComponent,
    TwinsGroupSpecificationsComponent,
    TwinsGroupComponent,
    TwinsComponent
  ],
  imports: [
    CommonModule,
    TwinsRoutingModule,
    TranslateModule,
    UtilsModule,
    UserModule,
    CommentsModule,
    PaginatorModule
  ],
  providers: [
    TwinsService
  ]
})
export class TwinsModule {}
