import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UploadIndexComponent} from './index/index.component';
import {UploadSelectComponent} from './select/select.component';
import {UploadComponent} from './upload.component';

const routes: Routes = [
  {
    children: [
      {component: UploadSelectComponent, path: 'select', title: $localize`Select brand`},
      {component: UploadIndexComponent, path: '', pathMatch: 'full', title: $localize`Add picture`},
    ],
    component: UploadComponent,
    path: '',
    title: $localize`Add picture`,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class UploadRoutingModule {}
