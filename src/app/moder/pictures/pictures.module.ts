import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbTooltipModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';
import {NgPipesModule} from 'ngx-pipes';

import {APIPerspectiveModule} from '../../api/perspective/perspective.module';
import {MarkdownEditModule} from '../../markdown-edit/markdown-edit.module';
import {PaginatorModule} from '../../paginator/paginator.module';
import {PictureModerVoteModule} from '../../picture-moder-vote/picture-moder-vote.module';
import {ThumbnailModule} from '../../thumbnail/thumbnail.module';
import {UserModule} from '../../user/user.module';
import {ModerPicturesItemAreaComponent} from './item/area/area.component';
import {ModerPicturesItemCropComponent} from './item/crop/crop.component';
import {ModerPicturesItemComponent} from './item/item.component';
import {ModerPictureMoveItemComponent} from './item/move/item/item.component';
import {ModerPicturesItemMoveComponent} from './item/move/move.component';
import {ModerPicturesItemPlaceComponent} from './item/place/place.component';
import {ModerPicturesPerspectivePickerComponent} from './perspective-picker/perspective-picker.component';
import {ModerPicturesComponent} from './pictures.component';
import {PicturesRoutingModule} from './pictures-routing.module';

@NgModule({
  declarations: [
    ModerPicturesComponent,
    ModerPicturesItemAreaComponent,
    ModerPicturesItemCropComponent,
    ModerPicturesItemMoveComponent,
    ModerPictureMoveItemComponent,
    ModerPicturesItemComponent,
    ModerPicturesItemPlaceComponent,
    ModerPicturesPerspectivePickerComponent,
  ],
  exports: [ModerPicturesPerspectivePickerComponent],
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
    UtilsModule,
    UserModule,
    MarkdownEditModule,
    PictureModerVoteModule,
    APIPerspectiveModule,
    LeafletModule,
  ],
})
export class PicturesModule {}
