import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbTooltipModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {APIAttrsModule} from '../api/attrs/attrs.module';
import {APICommentsModule} from '../api/comments/comments.module';
import {APIPictureModerVoteTemplateModule} from '../api/picture-moder-vote-template/picture-moder-vote-template.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {UserModule} from '../user/user.module';
import {ModerAttrsAttributeComponent} from './attrs/attribute/attribute.component';
import {ModerAttrsAttributeListComponent} from './attrs/attribute-list/attribute-list.component';
import {ModerAttrsComponent} from './attrs/attrs.component';
import {ModerAttrsZoneAttributeListComponent} from './attrs/zone/attribute-list/attribute-list.component';
import {ModerAttrsZoneComponent} from './attrs/zone/zone.component';
import {ModerCommentsComponent} from './comments/comments.component';
import {ModerIndexComponent} from './index/index.component';
import {ModerItemParentComponent} from './item-parent/item-parent.component';
import {ModerRoutingModule} from './moder-routing.module';
import {ModerPerspectivesComponent} from './perspectives/perspectives.component';
import {ModerPictureVoteTemplatesComponent} from './picture-vote-templates/picture-vote-templates.component';
import {ModerStatComponent} from './stat/stat.component';
import {ModerUsersComponent} from './users/users.component';

@NgModule({
  declarations: [
    ModerIndexComponent,
    ModerPerspectivesComponent,
    ModerUsersComponent,
    ModerAttrsComponent,
    ModerAttrsAttributeComponent,
    ModerAttrsZoneComponent,
    ModerCommentsComponent,
    ModerPictureVoteTemplatesComponent,
    ModerAttrsAttributeListComponent,
    ModerAttrsZoneAttributeListComponent,
    ModerStatComponent,
    ModerItemParentComponent,
  ],
  imports: [
    CommonModule,
    ModerRoutingModule,
    FormsModule,
    NgbTypeaheadModule,
    UserModule,
    PaginatorModule,
    UtilsModule,
    HttpClientModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    APIAttrsModule,
    NgbDropdownModule,
    APIPictureModerVoteTemplateModule,
    APICommentsModule,
  ],
})
export class ModerModule {}
