import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsSpecificationsEditorSpecComponent } from './specifications-editor/spec/spec.component';
import { CarsSpecificationsEditorResultComponent } from './specifications-editor/result/result.component';
import { CarsSpecificationsEditorEngineComponent } from './specifications-editor/engine/engine.component';
import { CarsSelectEngineTreeItemComponent } from './specifications-editor/engine/select/tree-item/tree-item.component';
import { CarsSpecsAdminComponent } from './specs-admin/specs-admin.component';
import { CarsSpecificationsEditorComponent } from './specifications-editor/specifications-editor.component';
import { CarsEngineSelectComponent } from './specifications-editor/engine/select/select.component';
import { CarsDatelessComponent } from './dateless/dateless.component';
import { CarsAttrsChangeLogComponent } from './attrs-change-log/attrs-change-log.component';
import { NgbTypeaheadModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { UserModule } from '../user/user.module';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from '../paginator/paginator.module';
import { UtilsModule } from '../utils/utils.module';
import {ItemModule} from '../item/item.module';

@NgModule({
  declarations: [
    CarsAttrsChangeLogComponent,
    CarsDatelessComponent,
    CarsEngineSelectComponent,
    CarsSpecificationsEditorComponent,
    CarsSpecsAdminComponent,
    CarsSelectEngineTreeItemComponent,
    CarsSpecificationsEditorEngineComponent,
    CarsSpecificationsEditorResultComponent,
    CarsSpecificationsEditorSpecComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    NgbTypeaheadModule,
    FormsModule,
    MomentModule,
    UserModule,
    TranslateModule,
    PaginatorModule,
    NgbTooltipModule,
    UtilsModule,
    ItemModule
  ]
})
export class CarsModule { }
