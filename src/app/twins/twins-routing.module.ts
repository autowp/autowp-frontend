import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwinsComponent } from './twins.component';
import { TwinsGroupComponent } from './twins-group.component';
import { TwinsGroupSpecificationsComponent } from './twins-group-specifications.component';
import { TwinsGroupPicturesComponent } from './twins-group-pictures.component';

const routes: Routes = [
  {
    path: 'group',
    children: [
      {
        path: ':group',
        children: [
          { path: 'pictures', component: TwinsGroupPicturesComponent },
          { path: 'specifications', component: TwinsGroupSpecificationsComponent },
          { path: '', component: TwinsGroupComponent }
        ]
      }
    ]
  },
  { path: ':brand', component: TwinsComponent },
  { path: '', pathMatch: 'full', component: TwinsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwinsRoutingModule { }
