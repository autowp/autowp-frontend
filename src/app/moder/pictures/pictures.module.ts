import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PicturesRoutingModule } from './pictures-routing.module';
import { ModerPicturesComponent } from './pictures.component';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from '../../paginator/paginator.module';
import { ModerPicturesItemAreaComponent } from './item/area/area.component';
import { ModerPicturesItemCropComponent } from './item/crop/crop.component';
import { ModerPictureMoveItemComponent } from './item/move/item/item.component';
import { ModerPicturesItemComponent } from './item/item.component';
import { ModerPicturesItemMoveComponent } from './item/move/move.component';
import { ThumbnailModule } from '../../thumbnail/thumbnail.module';
import { NgPipesModule } from 'ngx-pipes/src/ng-pipes/ng-pipes.module';
import { MomentModule } from 'ngx-moment';
import { UtilsModule } from '../../utils/utils.module';
import { UserModule } from '../../user/user.module';
import { MarkdownEditModule } from '../../markdown-edit/markdown-edit.module';
import { PictureModerVoteModule } from '../../picture-moder-vote/picture-moder-vote.module';
import {
  NgbTypeaheadModule,
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { APIPerspectiveModule } from '../../api/perspective/perspective.module';
import {ModerPicturesItemPlaceComponent} from './item/place/place.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {ModerPicturesPerspectivePickerComponent} from './perspective-picker/perspective-picker.component';

@NgModule({
  declarations: [
    ModerPicturesComponent,
    ModerPicturesItemAreaComponent,
    ModerPicturesItemCropComponent,
    ModerPicturesItemMoveComponent,
    ModerPictureMoveItemComponent,
    ModerPicturesItemComponent,
    ModerPicturesItemPlaceComponent,
    ModerPicturesPerspectivePickerComponent
  ],
  imports: [
    CommonModule,
    PicturesRoutingModule,
    FormsModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    PaginatorModule,
    ThumbnailModule,
    NgPipesModule,
    MomentModule,
    UtilsModule,
    UserModule,
    MarkdownEditModule,
    PictureModerVoteModule,
    APIPerspectiveModule,
    LeafletModule
  ],
  exports: [
    ModerPicturesPerspectivePickerComponent
  ]
})
export class PicturesModule {}
