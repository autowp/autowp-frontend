import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModerGuard } from '../../moder.guard';
import { ModerHotlinksComponent } from './hotlinks.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ModerHotlinksComponent,
    canActivate: [ModerGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotlinksRoutingModule { }
