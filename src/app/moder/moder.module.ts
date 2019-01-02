import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModerRoutingModule } from './moder-routing.module';
import { ModerGuard } from '../moder.guard';
import { ModerIndexComponent } from './index/index.component';
import { ModerPerspectivesComponent } from './perspectives/perspectives.component';
import { ModerUsersComponent } from './users/users.component';
import { ModerAttrsComponent } from './attrs/attrs.component';
import { ModerAttrsAttributeComponent } from './attrs/attribute/attribute.component';
import { ModerAttrsZoneComponent } from './attrs/zone/zone.component';
import { ModerCommentsComponent } from './comments/comments.component';
import { ModerPagesComponent } from './pages/pages.component';
import { ModerPagesAddComponent } from './pages/add/add.component';
import { ModerPagesEditComponent } from './pages/edit/edit.component';
import { ModerPictureVoteTemplatesComponent } from './picture-vote-templates/picture-vote-templates.component';
import { ModerRightsComponent } from './rights/rights.component';
import { ModerRightsTreeComponent } from './rights/tree/tree.component';
import { ModerAttrsAttributeListComponent } from './attrs/attribute-list/attribute-list.component';
import { ModerAttrsZoneAttributeListComponent } from './attrs/zone/attribute-list/attribute-list.component';
import { ModerAttrsAttributeListOptionsTreeComponent } from './attrs/attribute/list-options-tree/list-options-tree.component';
import { ModerStatComponent } from './stat/stat.component';
import { ModerItemParentComponent } from './item-parent/item-parent.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from '../user/user.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { UtilsModule } from '../utils/utils.module';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
import { APIAttrsModule } from '../api/attrs/attrs.module';

@NgModule({
  declarations: [
    ModerIndexComponent,
    ModerPerspectivesComponent,
    ModerUsersComponent,
    ModerAttrsComponent,
    ModerAttrsAttributeComponent,
    ModerAttrsZoneComponent,
    ModerCommentsComponent,
    ModerPagesComponent,
    ModerPagesAddComponent,
    ModerPagesEditComponent,
    ModerPictureVoteTemplatesComponent,
    ModerRightsComponent,
    ModerRightsTreeComponent,
    ModerAttrsAttributeListComponent,
    ModerAttrsZoneAttributeListComponent,
    ModerAttrsAttributeListOptionsTreeComponent,
    ModerStatComponent,
    ModerItemParentComponent
  ],
  imports: [
    CommonModule,
    ModerRoutingModule,
    TranslateModule,
    FormsModule,
    NgbTypeaheadModule,
    UserModule,
    PaginatorModule,
    UtilsModule,
    HttpClientModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    MomentModule,
    APIAttrsModule
  ],
  providers: [ModerGuard]
})
export class ModerModule {}
