import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbTooltipModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {ItemModule} from '../item/item.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {UserModule} from '../user/user.module';
import {CarsAttrsChangeLogComponent} from './attrs-change-log/attrs-change-log.component';
import {CarsRoutingModule} from './cars-routing.module';
import {CarsDatelessComponent} from './dateless/dateless.component';
import {CarsSpecificationsEditorEngineComponent} from './specifications-editor/engine/engine.component';
import {CarsEngineSelectComponent} from './specifications-editor/engine/select/select.component';
import {CarsSelectEngineTreeItemComponent} from './specifications-editor/engine/select/tree-item/tree-item.component';
import {CarsSpecificationsEditorResultComponent} from './specifications-editor/result/result.component';
import {CarsSpecificationsEditorSpecComponent} from './specifications-editor/spec/spec.component';
import {CarsSpecificationsEditorComponent} from './specifications-editor/specifications-editor.component';
import {CarsSpecsAdminComponent} from './specs-admin/specs-admin.component';

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
    CarsSpecificationsEditorSpecComponent,
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    NgbTypeaheadModule,
    FormsModule,
    UserModule,
    PaginatorModule,
    NgbTooltipModule,
    UtilsModule,
    ItemModule,
    ReactiveFormsModule,
  ],
})
export class CarsModule {}
