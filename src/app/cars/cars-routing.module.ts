import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CarsAttrsChangeLogComponent} from './attrs-change-log/attrs-change-log.component';
import {CarsDatelessComponent} from './dateless/dateless.component';
import {CarsEngineSelectComponent} from './specifications-editor/engine/select/select.component';
import {CarsSpecificationsEditorComponent} from './specifications-editor/specifications-editor.component';
import {CarsSpecsAdminComponent} from './specs-admin/specs-admin.component';

const routes: Routes = [
  {
    component: CarsAttrsChangeLogComponent,
    path: 'attrs-change-log',
    title: $localize`History`,
  },
  {
    component: CarsDatelessComponent,
    path: 'dateless',
    title: $localize`Dateless`,
  },
  {
    component: CarsEngineSelectComponent,
    path: 'select-engine',
  },
  {
    component: CarsSpecificationsEditorComponent,
    path: 'specifications-editor',
  },
  {
    component: CarsSpecsAdminComponent,
    path: 'specs-admin',
    title: $localize`Specifications Admin`,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class CarsRoutingModule {}
