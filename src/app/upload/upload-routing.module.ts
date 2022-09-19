import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadSelectComponent } from './select/select.component';
import { UploadComponent } from './upload.component';

const routes: Routes = [
  { path: 'select', component: UploadSelectComponent, title: $localize `Select brand` },
  { path: '', pathMatch: 'full', component: UploadComponent, title: $localize `Add picture` }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule {}
