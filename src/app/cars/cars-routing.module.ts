import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsSpecsAdminComponent } from './specs-admin/specs-admin.component';
import { CarsSpecificationsEditorComponent } from './specifications-editor/specifications-editor.component';
import { CarsEngineSelectComponent } from './specifications-editor/engine/select/select.component';
import { CarsDatelessComponent } from './dateless/dateless.component';
import { CarsAttrsChangeLogComponent } from './attrs-change-log/attrs-change-log.component';

const routes: Routes = [
  {
    path: 'attrs-change-log',
    component: CarsAttrsChangeLogComponent,
    title: $localize `History`
  },
  {
    path: 'dateless',
    component: CarsDatelessComponent,
    title: $localize `Dateless`
  },
  {
    path: 'select-engine',
    component: CarsEngineSelectComponent
  },
  {
    path: 'specifications-editor',
    component: CarsSpecificationsEditorComponent
  },
  {
    path: 'specs-admin',
    component: CarsSpecsAdminComponent,
    title: $localize `Specifications Admin`
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
